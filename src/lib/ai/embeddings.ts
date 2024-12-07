import { embed } from "ai";
import { openai } from "@ai-sdk/openai";


const embeddingModel = openai.embedding("text-embedding-3-small");


export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\n", " ");
  const { embedding, usage } = await embed({
    model: embeddingModel,
    value: input,
  });

  console.log("Embedding usage: ", usage);
  return embedding;
};



