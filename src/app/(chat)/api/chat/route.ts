import { openai } from '@ai-sdk/openai';
import {streamText, generateObject } from 'ai';
import { z } from "zod";
import clientPromise from "@/lib/db/mongodb";
import {prompt_es_energia, prompt_en_energia, prompt_pt_energia} from "@/components/utils/prompts_and_tools";
import {prompt_es_OLAS, prompt_en_OLAS, prompt_pt_OLAS} from "@/components/utils/prompts_and_tools";
import {prompt_es_gral, prompt_en_gral, prompt_pt_gral} from "@/components/utils/prompts_and_tools";
import {prompt_es_all, prompt_en_all, prompt_pt_all} from "@/components/utils/prompts_and_tools";

import {documentRetriever, documentRetriever2} from "@/components/utils/prompts_and_tools";

const doc_id = z.string().describe('doc_id from the documents')

// Dependiendo el idioma y el hub seleccionamos la colección y el prompt del siguiente diccionario
// Valores posibles:
type ValidKeys = `${string}_${string}`;
// diccionario:
const prompt_y_collection: Record<ValidKeys, string[]>  = {
  'all_spanish': [prompt_es_all + prompt_es_gral, '', ''],
  'all_english': [prompt_en_all + prompt_en_gral, '', ''],
  'all_portuguese': [prompt_pt_all + prompt_pt_gral, '', ''],
  'OLAS_spanish': [prompt_es_OLAS + prompt_es_gral, "olas", "olas"],
  'OLAS_english': [prompt_en_OLAS + prompt_en_gral, "olas", "olas"],
  'OLAS_portuguese': [prompt_pt_OLAS + prompt_pt_gral, "olas", "olas"],
  'energy_spanish': [prompt_es_energia + prompt_es_gral, "energy", "energy"],
  'energy_english': [prompt_en_energia + prompt_en_gral, "energy", "energy"],
  'energy_portuguese': [prompt_pt_energia + prompt_pt_gral, "energy", "energy"]
}

export const maxDuration = 30;

// Function to determine the language
async function language_def(input: string){
  const { object } = await generateObject({
    model: openai("gpt-4o-mini", { structuredOutputs: true }),
    output: 'enum',
    enum: ['spanish', 'english', 'portuguese', 'unknown'],
    prompt:
      'Detrmine the language of this input: ' + input,
  });
  return object
}

export async function POST(req: Request) {
  const { messages, option} = await req.json();
  const input = messages[messages.length - 1]['content']
  // A partir de la opción (de hub) y el idioma, definimos el prompt y las colecciones
  const language = await language_def(input);

  console.log(language, option)

  let key: ValidKeys;
  if (language !== 'unknown') {
    key = `${option}_${language}`;
  } else {
    key = `${option}_${'spanish'}`;
  }

  const [prompt, collection_catalogue, collection_docs] = prompt_y_collection[key];
  console.log(prompt)
  
  // Model definition
const result = streamText({
    model: openai("gpt-4o-mini", { structuredOutputs: true }),
    experimental_toolCallStreaming: false,
    system: prompt,
    messages,
    tools: {
      catalogueRetriever: 
        {
          description: 'A tool to get the catalogue of the available documents based on the users question, query should be in spanish.',
          parameters: z.object({
            query: z.string(), 
            catalogue: z.string().describe("options are: ['energy', 'olas']")}),
          execute: async ({query, catalogue}) => {
            if (collection_catalogue != '') {
              return documentRetriever(query, collection_catalogue);
            }
            else{
              return documentRetriever(query, catalogue);
            }
          }
        },
        documentRetriever: 
        {
          description: 'Use it read the available documents based on the document_id gotten from the tool catalogueRetriever. Query should be in spanish.',
          parameters: z.object({
            query: z.string(), 
            doc_ids: z.array(doc_id).describe('All the doc_ids you consider relevant.'),
            collection: z.string().describe("Options are ['energy', 'olas']")
          }),
          execute: async ({query, doc_ids, collection}) => {
            if (collection_docs != '') {
              return documentRetriever2(query, doc_ids, collection_docs);
            }
            else{
              return documentRetriever2(query, doc_ids, collection);
            }
          }
        },
  },
  maxSteps: 3,
  async onFinish({ text, usage, }) {
    // tu lógica aquí, por ejemplo para guardar historia o contabilizar tokens
    // write in mongodb the user query, the response and the usage tokens
    const client = await clientPromise;
    const db = client.db("rag_lab");
    const coll = db.collection("logs");
    await coll.insertOne({
      user_query: messages[messages.length - 1].content,
      rag_ctx: prompt,
      response: text,
      usageTokens: usage,
      interactionId : messages[messages.length - 1].id,
      dateTime : messages[messages.length - 1].createdAt,
      hub: option,
    });
  },
});

return result.toDataStreamResponse();
}

