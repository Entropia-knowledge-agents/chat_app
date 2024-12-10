// embeddings.ts

import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

const embeddingModel = openai.embedding("text-embedding-3-small", {
  dimensions: 1024,
});

interface EmbeddingResult {
  embedding: number[];
  usageTokens: number;
}

export const generateEmbedding = async (
  value: string
): Promise<EmbeddingResult> => {
  try {
    const input = value.replace(/\n/g, " ");
    const { embedding, usage } = await embed({
      model: embeddingModel,
      value: input,
    });


    return { embedding, usageTokens: usage.tokens };
  } catch (error) {
    console.error("Error generando el embedding:", error);
    throw error;
  }
};

