import { openai } from '@ai-sdk/openai';
import {streamText, tool } from 'ai';
import { z } from 'zod';
import { generateEmbedding } from "@/lib/ai/embeddings";
import { vectorQuery } from "@/lib/db/queries/vectorquery";

const doc_id = z.string().describe('doc_id from the documents')

async function documentRetriever(query: string) {
  console.log("entró a la función de catalogo con la query:")
  console.log(query)
  const { embedding, usageTokens } = await generateEmbedding(query);
  console.log('usageTokens')
  console.log(usageTokens)
  const retrievedDocs = await vectorQuery(embedding, "documents_catalogue", "documents_olas", {});
  console.log('y obtuvo los siguintes documentos:')
  console.log(retrievedDocs)
  return retrievedDocs;
}

async function documentRetriever2(query: string, doc_ids:object) {
  console.log("entró a la función de documentos")
  console.log("utilizando los doc_ids:")
  console.log(doc_ids)
  console.log("y la query:")
  console.log(query)
  const filter = {"doc_id": {"$in": doc_ids}}

  const { embedding, usageTokens } = await generateEmbedding(query);
  console.log('usageTokens')
  console.log(usageTokens)
  const retrievedDocs = await vectorQuery(embedding, "documents_content", "content_olas", filter);
  console.log('y obtuvo los siguintes documentos:')
  console.log(retrievedDocs)
  return retrievedDocs;
}


export const maxDuration = 30;

const prompt = `Eres un analista experto en agua y saneamiento en América Latina y el Caribe que trabaja para 
el Observatorio para América Latina y el Caribe de Agua y Saneamiento (OLAS) donde recopila información relevante sobre el sector agua y saneamiento
en la región y contribuyen a la generación y publicación de datos robustos relacionados con el Objetivo de Desarrollo Sostenible (ODS).

Tu objetivo es tanto recomendar documentos como proporcionar informacion específica disponible en los documentos. Para ello tienes dos herramientas
la de catalogueRetriever que te permite acceder al catálogo para conocer los documentos más relevantes y la de documentRetriever que te permitirá 
proporcionar información más específica dado los documentos seleccionados.

No inventes datos, debes estar seguro que los documentos que escojas responden de manera correcta y específica la pregunta del usuario, si no encuentras información específica mencionalo.
Recuerda mencionar las referencias en formato Markdown.
`

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-4o-mini", { structuredOutputs: true }),
    experimental_toolCallStreaming: false,
    system: prompt,
    messages,
    tools: {
      catalogueRetriever: tool(
        {
          description: 'A tool to get the catalogue of the available documents based on the users question, query should be in spanish.',
          parameters: z.object({ query: z.string()}),
          execute: async ({query}) => documentRetriever(query),
          }
      ),
      documentRetriever: tool(
        {
          description: 'Use it read the available documents based on the document_id gotten from the tool catalogueRetriever. Query should be in spanish.',
          parameters: z.object({query: z.string(), doc_ids: z.array(doc_id).describe('All the doc_ids you consider relevant.')}),
          execute: async ({query, doc_ids}) => documentRetriever2(query, doc_ids),
          }
      ),
  },
  maxSteps: 3,
});

return result.toDataStreamResponse();
}
