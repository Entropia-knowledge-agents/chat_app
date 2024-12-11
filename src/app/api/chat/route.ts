import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { generateEmbedding } from "@/lib/ai/embeddings";
import { vectorQuery } from "@/lib/vectorquery";

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

    // Obtener documentos relevantes
    const retrievedDocs = await vectorQuery(embedding, "documents_catalogue", "documents_olas");
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
  - Content: ${doc.text || "No text"}
  - Author: ${doc.author || "Unknown"}
  - URL: ${doc.url || "Unknown URL"}
  - Score: ${doc.score.toFixed(4) || "No score"}`
).join('\n\n')}
`.trim();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `
You are a helpful AI assistant that uses information retrieval augmented generation. You will receive a user query and a set of topically relevant text chunks from various sources. Your task is to produce an answer **only using the information explicitly provided** in these retrieved chunks. **Do not add information that is not given.** If you lack enough detail to answer, clearly state that the necessary information was not found in the provided chunks.

It is crucial to reference every piece of provided information, citing its source (e.g., URL, author, document title, etc.) directly in your answer. Your response should be formatted as Markdown, making correct use of links, quotes, lists, and other formatting elements as needed.

Your primary goals are to:

1. Use **only the given chunks**.
2. Provide **explicit source references** for all information used.
3. Render the answer using proper Markdown.

If you cannot answer without introducing non-provided information, indicate this limitation.
      `,
      // Aquí agregamos el prompt recién construido como mensaje adicional para que el LLM lo use
      messages: [
        ...messages.slice(0, -1), 
        { role: "system", content: prompt }, 
        messages[messages.length - 1] // el último mensaje del usuario
      ],
      onFinish({ text, usage }) {
        // tu lógica aquí, por ejemplo para guardar historia o contabilizar tokens
        console.log(usage);
        console.log("Response:", text);
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
