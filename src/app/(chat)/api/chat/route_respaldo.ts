import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { generateEmbedding } from "@/lib/ai/embeddings";
import { vectorQuery } from "@/lib/db/queries/vectorquery";
import clientPromise from "@/lib/db/mongodb";


export const maxDuration = 59;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Asegúrate de que messages es un array y accede al último mensaje
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages array", { status: 400 });
    }

    // Último mensaje del usuario (la query)
    const lastMessageContent = messages[messages.length - 1].content;

    // Generar embeddings para el último mensaje
    const { embedding, usageTokens } = await generateEmbedding(lastMessageContent);
    console.log("Usage tokens:", usageTokens);

    // Obtener documentos relevantes
    const retrievedDocs = await vectorQuery(embedding, "documents_content", "content_olas");
    console.log(retrievedDocs);

    // Tomar hasta 5 mensajes anteriores como contexto (excluyendo el último)
    const contextMessages = messages.slice(-6, -1);

    // Construir el prompt con el contexto, la query y los documentos relevantes
    const prompt = `
Below is the conversation context (up to 5 previous messages), the user's latest query, and the topically relevant retrieved chunks.

**Conversation context** (last up to 5 messages before the user query):
${contextMessages.map((m) => `- **${m.role}**: ${m.content}`).join('\n')}

**User query**:
${lastMessageContent}

**Retrieved Chunks**:
${retrievedDocs.map((doc, i) => 
  `**Chunk ${i+1}:**
  ${doc.ctx_chunk || "No text"}
  - Page: ${doc.page || "Unknown"}
  - Chunk in Page: ${doc.chunk_id || "Unknown"}
  - URL: ${doc.url || "Unknown URL"}
  - Score: ${doc.score.toFixed(3) || "No score"}`
).join('\n\n')}
`.trim();


    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `You are an AI assistant specialized in technical documentation and information retrieval. Your task is to provide accurate answers based exclusively on the provided documentation chunks.

      LANGUAGE AND FORMATTING:
      - Detect the language of the user's query and respond in the same language
      - Format responses using Markdown
      - Use appropriate technical terminology for the detected language
      - Include original quotes in their source language when relevant
      
      SOURCE VALIDATION:
      - Use ONLY information from the provided chunks
      - Verify source consistency and relevance
      - Prioritize most recent sources when multiple references exist
      - Indicate explicitly if information is outdated or ambiguous
      
      RESPONSE FORMAT:
      1. Structure your answer using Markdown
      2. Always include specific references using this format:
         > According to [author] in "[title]"([url]) page [number]: [exact quote or answer]
      3. Organize information in clear sections using headers. At the end, include a summary not a conclusion (if aplicable).
      
      INFORMATION HANDLING:
      - If requested information is not in the chunks, state: "The provided documentation does not contain specific information about this topic"
      - For technical topics, include examples only if explicitly present in sources
      - When cross-references exist between documents, clearly indicate them
      - If information appears contradictory between sources, highlight the discrepancy
      
      STRICT GUIDELINES:
      - Do not make assumptions beyond provided information
      - Do not combine with external knowledge
      - Always respect regional/geographical context of sources
      - Match the language of your response to the user's query language
      
      If you cannot provide a complete answer with available information, explain which specific aspects cannot be addressed based on current documentation.`,
      // Aquí agregamos el prompt recién construido como mensaje adicional para que el LLM lo use
      messages: [
        //...messages.slice(0, -1), 
        { role: "system", content: prompt }, 
        messages[messages.length - 1] // el último mensaje del usuario
      ],
      async onFinish({ text, usage }) {
        // tu lógica aquí, por ejemplo para guardar historia o contabilizar tokens
        console.log(usage);
        // write in mongodb the user query, the response and the usage tokens
        const client = await clientPromise;
        const db = client.db("rag_lab");
        const coll = db.collection("logs");
        await coll.insertOne({
          user_query: messages[messages.length - 1].content,
          rag_ctx: prompt,
          response: text,
          usageTokens: usage,
        });

      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
