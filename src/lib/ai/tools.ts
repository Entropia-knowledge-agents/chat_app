import { generateEmbedding } from "@/lib/ai/embeddings";
import { vectorQuery } from "@/lib/db/queries/vectorquery";

// Tool document retriever for catalogue
export async function documentRetriever(query: string, collection_catalogue: string) {
    const { embedding, usageTokens } = await generateEmbedding(query);
    console.log('documentRetriever con la query', query)
    console.log('y la colección ', collection_catalogue)
    console.log('usageTokens', usageTokens)
    const retrievedDocs = await vectorQuery(embedding, 'documents_catalogue', 'documents_' + collection_catalogue, {});
    console.log('docs', retrievedDocs)
    return retrievedDocs;
  }
  
// Tool document retriever for documents
export async function documentRetriever2(query: string, doc_ids:object, collection_docs: string) {
    console.log('******** doc_ids: ', doc_ids)
    const filter = {"doc_id": {"$in": doc_ids}}
  
    const { embedding, usageTokens } = await generateEmbedding(query);
  
    console.log('documentRetriever2 con la query', query)
    console.log('y la colección ', collection_docs)

    console.log('usageTokens', usageTokens)
    const retrievedDocs = await vectorQuery(embedding, 'documents_content', 'content_' + collection_docs, filter);
    console.log('docs', retrievedDocs)
    return retrievedDocs;
  }

// Tool page info retriever
export async function page_info(query: string, collection_catalogue: string) {
  const { embedding, usageTokens } = await generateEmbedding(query);
  console.log('page_info con la query', query)
  console.log('y la colección ', collection_catalogue)
  console.log('usageTokens', usageTokens)
  const retrievedDocs = await vectorQuery(embedding, 'static_content', collection_catalogue, {});
  console.log('docs', retrievedDocs)
  return retrievedDocs;
}
