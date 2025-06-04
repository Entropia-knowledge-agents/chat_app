import { azure } from '@ai-sdk/azure';
import { generateObject } from "ai";

// Function to determine the language
export default async function detectLanguage(input: string) {
  const { object } = await generateObject({
    model: azure("gpt-4.1-mini", { structuredOutputs: true }),
    output: "enum",
    enum: ["spanish", "english", "portuguese", "unknown"],
    prompt: "Detrmine the language of this input: " + input,
  });
  return object;
}
