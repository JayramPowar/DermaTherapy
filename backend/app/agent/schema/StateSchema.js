import { z } from "zod";
import { PatientSchema } from "./PatientSchema.js";

export const StateSchema = z.object({
    description: PatientSchema.optional(),
  
    imagePath: z.string().optional(),
    imageBase64: z.string().optional(),
    baseClass: z.string().optional(),
    baseClassPredictions: z.array(z.any()).optional(),
    subClass: z.string().optional(),
    subClassPredictions: z.array(z.any()).optional(),
    context: z.array(z.string()).optional(), // retrieved text chunks
    answer: z.string().optional() // final generated response
  });