import { MongoClient } from "mongodb";

export const connectNativeDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_ATLAS_URI);
        await client.connect();
        const db = client.db("dermatherapy"); // Replace with your DB name
        const collection = db.collection("remedies"); // Replace with your collection name
        console.log("Connected to native MongoDB.");
        return { client, collection }; // clean return
    } catch (err) {
        console.error("Failed to connect to native MongoDB:", err);
        throw err; // rethrow so caller knows it failed
    }
};