import mongoose from "mongoose";
import { patientSchema } from "./schema/patientSchema.js"

// Export model
export const patientModel = mongoose.model("Patient", patientSchema);