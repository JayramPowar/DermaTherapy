import mongoose from "mongoose";
import { recordSchema } from "../schema/recordSchema.js";

export const Record = mongoose.model("Record", recordSchema);