import mongoose from "mongoose";

export const connectDB = async () => {
    // ? Connect to MongoDB using Mongoose
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URI);
        mongoose.set("debug", true);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(0);
    }
}