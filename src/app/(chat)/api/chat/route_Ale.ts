import { openai } from '@ai-sdk/openai';
import { streamText } from "ai";
import 'dotenv/config';
import { z } from 'zod';
import { generateEmbedding } from "@/lib/ai/embeddings";
import { vectorQuery } from "@/lib/db/queries/vectorquery";


const FilterValues = z.object({
  publication_year: z.string().describe('One of the followings: 2007, 2008, ..., 2023, 2024'),
  document_resource: z.string().describe('One of the followings: document, presentation, publication, report, scientific_paper'),
});

const FinalResult = z.object({
  summary: z.string(),
  literature_recomendation: z.string().describe('Based on the documents you chosed, reference them formatted as Markdown.'),
})

async function documentRetriever(query: string, filter:Record<string, any>) {
  const filter_v: Record<string, any> = {};
        for (const [key, value] of Object.entries(filter)) {
            if (value) {
              filter_v[key] = value;
                }
            }

  const { embedding, usageTokens } = await generateEmbedding(query);
  const retrievedDocs = await vectorQuery(embedding, "documents_catalogue", "documents_olas");
  return retrievedDocs;
}


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini", { structuredOutputs: true }),
    tools: {
      documentRetriever: {
        description: 'A tool to get the relevant data based on the users question.',
        parameters: z.object({ query: z.string(), filter: FilterValues}),
        execute: async ({ query, filter}) => documentRetriever(query, filter),
      },
      // answer tool: the LLM will provide a structured answer
    answer: {
      description: 'A tool for providing the final answer.',
      parameters: FinalResult,
    },
  },
});

return result.toDataStreamResponse();
}
