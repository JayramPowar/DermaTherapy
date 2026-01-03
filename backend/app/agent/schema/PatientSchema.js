import { z } from "zod";

export const PatientSchema = z.object({
  age: z.string(),
  gender: z.string(),
  skinType: z.string(),
  familyHistory: z.string(),
  pregnant: z.string(),
  duration: z.string(),
  severity: z.number(),
  itching: z.string(),
  pain: z.string(),
  discharge: z.string(),
  sunExposure: z.string(),
  stress: z.string(),
  irritants: z.string(),
  treatments: z.string(),
});