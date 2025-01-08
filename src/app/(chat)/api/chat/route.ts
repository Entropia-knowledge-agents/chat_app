import { openai } from '@ai-sdk/openai';
import {streamText, tool } from 'ai';
import { z } from 'zod';
import { generateEmbedding } from "@/lib/ai/embeddings";
import { vectorQuery } from "@/lib/db/queries/vectorquery";

// Definimos el prompt dependiendo el Hub y el idioma:

// ESPAÑOL:

const prompt_es_OLAS = `Eres un analista experto en agua y saneamiento en América Latina y el Caribe que trabaja para 
el Observatorio para América Latina y el Caribe de Agua y Saneamiento (OLAS) donde recopila información relevante sobre el sector agua y saneamiento
en la región y contribuyen a la generación y publicación de datos robustos relacionados con el Objetivo de Desarrollo Sostenible (ODS).
`
const prompt_es_energia = `Eres un analista experto en energía en América Latina y el Caribe que trabajas con los datos disponibles en el Hub de energía
El Hub de Energía es un punto de encuentro que recopila, integra, difunde e impulsa información y datos sobre el sector energético de América Latina y el Caribe.
Este sitio facilita la búsqueda y uso de datos, y direcciona al usuario a las fuentes originales, lo que reduce las brechas de información y promueve la creación de conocimiento para la innovación,
la eficiencia energética y una mejor toma de decisiones en el sector. Trabajamos junto a nuestros socios, la academia, y los sectores públicos y privados para recopilar en un único lugar datos e información en diferentes áreas de interés del sector, p
rincipalmente infraestructura de red, acceso y asequibilidad, innovación, y energía renovable, entre otros.
`
const prompt_es_gral = `
Tu objetivo es tanto recomendar documentos como proporcionar informacion específica disponible en los documentos. Para ello tienes dos herramientas:
* catalogueRetriever te permite acceder al catálogo para conocer los documentos más relevantes en relación a la consulta
* documentRetriever te permitirá proporcionar información más específica dado los documentos seleccionados.

No inventes datos, debes estar seguro que los documentos que escojas responden de manera correcta y específica la pregunta del usuario, si no encuentras información específica mencionalo.
Recuerda mencionar las referencias en formato Markdown e incluir el número de página.
SIEMPRE DEBES RESPONDER EN ESPAÑOL.
`

//INGLES:

const prompt_en_OLAS = `You are an expert energy analyst in Latin America and the Caribbean who works with the data available in the Energy Hub
The Energy Hub is a meeting point that collects, integrates, disseminates and promotes information and data on the energy sector in Latin America and the Caribbean.
This site facilitates the search and use of data, and directs the user to the original sources, which reduces information gaps and promotes the creation of knowledge for innovation, 
energy efficiency and better decision-making in the sector. We work together with our partners, academia, and the public and private sectors to collect in one place data and information in
different areas of interest in the sector, mainly network infrastructure, access and affordability, innovation, and renewable energy, among others.
`
const prompt_en_energia = `You are an expert energy analyst in Latin America and the Caribbean who works with the data available in the Energy Hub
The Energy Hub is a meeting point that collects, integrates, disseminates and promotes information and data on the energy sector in Latin America and the Caribbean.
This site facilitates the search and use of data, and directs the user to the original sources, which reduces information gaps and promotes the creation of knowledge for innovation,
energy efficiency and better decision-making in the sector. We work together with our partners, academia, and the public and private sectors to collect data and information in a single place in different areas of interest in the sector, 
mainly network infrastructure, access and affordability, innovation, and renewable energy, among others.
`
const prompt_en_gral = `Your objective is both to recommend documents and to provide specific information available in the documents.
To do this you have two tools:
* catalogueRetriever, which allows you to access the catalogue to find the most relevant documents
* documentRetriever, which will allow you to provide more specific information given the selected documents.
 
Do not make up information or data, you must be sure that the documents you choose correctly and specifically answer the user's question;
if you do not find specific information, mention it.

Remember to mention the references in Markdown format and provide the page number.
YOU SHOULD ALWAYS RESPOND IN ENGLISH`

// PORTUGUES:

const prompt_pt_OLAS = `Você é um analista especialista em água e saneamento na América Latina e no Caribe que trabalha para
    o Observatório para a América Latina e o Caribe de Água e Saneamento (OLAS), onde coleta informações relevantes sobre o setor de água e saneamento
    na região e contribuir para a geração e publicação de dados robustos relacionados ao Objetivo de Desenvolvimento Sustentável (ODS).
    `
const prompt_pt_energia = `Você é um analista especialista em energia na América Latina e Caraíbas que trabalha com os dados disponíveis no Energy Hub
O Energy Hub é um ponto de encontro que recolhe, integra, divulga e promove informação e dados sobre o setor energético na América Latina e Caraíbas.
Este site facilita a pesquisa e utilização de dados, e direciona o utilizador para as fontes originais, o que reduz as lacunas de informação e promove a criação de conhecimento para a inovação,
eficiência energética e uma melhor tomada de decisões no setor. Trabalhamos em conjunto com os nossos parceiros, a academia e os setores público e privado para recolher dados e informações num único local em diferentes áreas de interesse do setor, p.
principalmente infraestruturas de rede, acesso e acessibilidade, inovação e energia renovável, entre outros.
`
const prompt_pt_gral = `O seu objetivo é recomendar documentos e fornecer informações específicas disponíveis nos documentos. Para o fazer tem duas ferramentas:
* catalogueRetriever permite aceder ao catálogo para conhecer os documentos mais relevantes em relação à consulta
* O documentRetriever permitirá fornecer informações mais específicas sobre os documentos selecionados.

Não invente dados, deve ter a certeza de que os documentos escolhidos respondem corretamente e especificamente à pergunta do utilizador. Caso não encontre informação específica, mencione-a.
Lembre-se de mencionar as referências em formato Markdown e de incluir o número da página.
Deve sempre responder em português.
`

export const maxDuration = 30;


// Tool document retriever for catalogue
async function documentRetriever(query: string, collection_catalogue: string) {
  const { embedding, usageTokens } = await generateEmbedding(query);
  console.log('usageTokens')
  console.log(usageTokens)
  const retrievedDocs = await vectorQuery(embedding, 'documents_catalogue', collection_catalogue, {});
  return retrievedDocs;
}

// Tool document retriever for documents
async function documentRetriever2(query: string, doc_ids:object, collection_docs: string) {
  const filter = {"doc_id": {"$in": doc_ids}}

  const { embedding, usageTokens } = await generateEmbedding(query);
  console.log('usageTokens')
  console.log(usageTokens)
  const retrievedDocs = await vectorQuery(embedding, 'documents_content', collection_docs, filter);
  return retrievedDocs;
}

function prompt_y_collection(option: string, language: string){
  let prompt: string;
  let collection_catalogue: string;
  let collection_docs: string;
  
  if (option == 'OLAS') {
    // para conectarnos al catalogo de olas
    collection_catalogue = "documents_olas";
    
    // para conectarnos a los documentos de olas
    collection_docs = "content_olas";
    
    if (language ==  'es') {
      prompt = prompt_es_OLAS + prompt_es_gral;
    }
    else if (language ==  'en') {
      prompt = prompt_en_OLAS + prompt_en_gral;
    }
    else {
      prompt = prompt_pt_OLAS + prompt_pt_gral;
    }
  }

  else{
    // para conectarnos al catalogo de energía
    collection_catalogue = "documents_energy";
    // para conectarnos a los documentos de energía
    collection_docs = "content_energia";
    if (language ==  'es') {
      prompt = prompt_es_energia + prompt_es_gral;
    }
    else if (language ==  'en') {
      prompt = prompt_en_energia + prompt_en_gral;
    }
    else {
      prompt = prompt_pt_energia + prompt_pt_gral;
    }
}
return [prompt, collection_catalogue, collection_docs];
}

const doc_id = z.string().describe('doc_id from the documents')

export async function POST(req: Request) {
  const { messages, option, language} = await req.json();
  const [prompt, collection_catalogue, collection_docs ] = prompt_y_collection(option, language);
  // A partir de la opción (de hub) y el idioma, definimos el prompt y las colecciones
   

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
          execute: async ({query}) => documentRetriever(query, collection_catalogue),
          }
      ),
      documentRetriever: tool(
        {
          description: 'Use it read the available documents based on the document_id gotten from the tool catalogueRetriever. Query should be in spanish.',
          parameters: z.object({query: z.string(), doc_ids: z.array(doc_id).describe('All the doc_ids you consider relevant.')}),
          execute: async ({query, doc_ids}) => documentRetriever2(query, doc_ids, collection_docs),
          }
      ),
  },
  maxSteps: 3,
});

return result.toDataStreamResponse();
}

