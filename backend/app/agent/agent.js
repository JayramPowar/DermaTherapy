import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver, StateGraph } from "@langchain/langgraph";
import { encode } from "./tools/encode.js";
import { predictBaseClass, predictSubClass } from "./tools/predict.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { PatientSchema } from "./schema/PatientSchema.js";
import { StateSchema } from "./schema/StateSchema.js";
import { connectNativeDB } from "./config/connect.js";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

// LLM for the final response
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY
});

// Memory to persist state
const memory = new MemorySaver();

const { client, collection } = await connectNativeDB();

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
  provider: "hf-inference",
});

const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
});

// Node 1: Encode image path to Base64
const encodeNode = async (state) => {
  const result = await encode.invoke({ imageBase64: state.imageBase64 });
  return { imageBase64: result.imageBase64 };
};

// Node 2: Predict class from Base64
const predictBaseClassNode = async (state) => {
  const result = await predictBaseClass.invoke({
    imageBase64: state.imageBase64,
  });


  // If result has a .top property, store it
  const topClass = result?.top || null;
  const predictionsList = result?.predictions || [];

  console.log("Predicting base class:", topClass);

  return {
    baseClass: topClass, // string for subClass lookup
    baseClassPredictions: predictionsList
  };
};


const predictSubClassNode = async (state) => {
  if (!state.baseClass) {
    throw new Error("Base class missing before predicting sub-class.");
  }

  // console.log("Predicting  base class:", blackhead);

  const result = await predictSubClass.invoke({
    imageBase64: state.imageBase64,
    baseClass: state.baseClass, // guaranteed to be string now
  });

  const topSubClass = result?.top || null;
  const predictionsList = result?.predictions || [];

  console.log("Predicting base class:", topSubClass);

  return {
    subClass: topSubClass,
    subClassPredictions: predictionsList
  };
};

const input = async (state) => {
  const validatedDesc = PatientSchema.parse(state.description);
  return { description: validatedDesc };
}

const retrieve = async (state) => {
  console.log("Starting retrieval process...");

  // Create the search object that mirrors the MongoDB metadata schema.
  const searchDescription = {
    disease: state.baseClass,
    subtype: state.subClass,
    ...state.description, // Adds all fields from the description object
  };

  const descriptionText = JSON.stringify(searchDescription, null, 2);
  const finalDocs = await vectorStore.similaritySearch(descriptionText, 5);
  return { context: finalDocs };
};

const generate = async (state) => {
  // Check if context exists and is not empty
  if (!state.context || state.context.length === 0) {
    return { answer: "No relevant information found in the database." };
  }

  const docsContent = state.context.map(doc => {
    // Access the metadata field directly
    const metadata = doc.metadata;

    // Format the metadata into a readable string for the model
    return `
          Patient ID: ${metadata.patient_id}
          Disease: ${metadata.disease}
          Subtype: ${metadata.subtype}
          Age: ${metadata.age}
          Gender: ${metadata.gender}
          Skin Type: ${metadata.skin_type}
          Family History: ${metadata.family_history}
          Duration: ${metadata.duration}
          Itching Severity: ${metadata.itching_severity}
          Pain: ${metadata.pain}
          Discharge: ${metadata.discharge}
          Stress Level: ${metadata.stress_level}
          Prior Treatments: ${metadata.prior_treatments}
          Remedies: ${metadata.remedies}
      `;
  }).join("\n---\n"); // Use a separator like "---" for clarity

  const template = PromptTemplate.fromTemplate(
    `You are a dermatology assistant.

    Base Class: {baseClass}
    Sub Class: {subClass}

    Patient details:
    {description}

    Context from similar cases:
    {context}

    Explain clearly in plain English:
    1. What this means for the patient
    2. Possible causes
    3. Practical remedies or treatments they can follow
    (Only provide general advice, not a medical diagnosis.)`
  );

  const prompt = await template.invoke({
    baseClass: state.baseClass,
    subClass: state.subClass,
    description: JSON.stringify(state.description, null, 2),
    context: docsContent
  });

  const response = await llm.invoke(prompt);
  return { answer: response.content };
};

// Build the graph
const workflow = new StateGraph(StateSchema)
  .addNode("encode_image", encodeNode)
  .addNode("predict_base_class", predictBaseClassNode)
  .addNode("predict_sub_class", predictSubClassNode)
  .addNode("input", input)
  .addNode("retrieve", retrieve)
  .addNode("generate", generate)
  .addEdge("encode_image", "predict_base_class")
  .addEdge("predict_base_class", "predict_sub_class")
  .addEdge("predict_sub_class", "input")
  .addEdge("input", "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("__start__", "encode_image")
  .addEdge("generate", "__end__");

// Compile the graph
export const app = workflow.compile({ checkpointer: memory });
