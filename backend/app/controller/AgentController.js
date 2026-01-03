import { app } from "../agent/agent.js";

export const AgentController = async (data) => {
  const {
    age,
    gender,
    skinType,
    familyHistory,
    pregnant,
    duration,
    severity,
    itching,
    pain,
    discharge,
    sunExposure,
    stress,
    irritants,
    treatments,
    image,
  } = data;

  // ✅ Schema for description (excluding image)
  const description = {
    age,
    gender,
    skinType,
    familyHistory,
    pregnant,
    duration,
    severity,
    itching,
    pain,
    discharge,
    sunExposure,
    stress,
    irritants,
    treatments,
  };

  // ✅ Run the graph
  const finalState = await app.invoke(
    {
      imageBase64: image || null, // first image blob URL
      description, // structured metadata
    },
    { configurable: { thread_id: "42" } }
  );

  return finalState.answer;
};
