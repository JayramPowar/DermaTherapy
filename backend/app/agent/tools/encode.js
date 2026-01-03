import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const encode = tool(
  async ({ imageBase64 }) => {
    return { imageBase64 };
  },
  {
    name: "encode",
    description: "Accepts an already provided Base64 image string and returns it.",
    schema: z.object({
      imageBase64: z.string().describe("Base64 string of the image"),
    }),
  }
);
