import clientPromise from "@/lib/db/mongodb";

interface VectorQueryResult {
  _id: string;
  ctx_chunk: string;
  page: number;
  chunk_id: number;
  url: string;
  score: number;
}

export const vectorQuery = async (
  vector: number[],
  database: string,
  collection: string
): Promise<VectorQueryResult[]> => {
  try {
    const client = await clientPromise;
    const db = client.db(database);
    const coll = db.collection(collection);


    const agg = [
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: vector,
          numCandidates: 150,
          limit: 25,
          filter: {},
        },
      },
      {
        $project: {
          _id: 1,
          ctx_chunk: 1,
          page: 1,
          chunk_id: 1,
          url: 1,
          score: {
            $meta: "vectorSearchScore",
          },
        },
      },
    ];

    // Ejecutar el pipeline de agregación y obtener los resultados como un array
    const results = await coll.aggregate(agg).toArray();

    // Retornar los resultados
    return results as VectorQueryResult[];
  } catch (error) {
    console.error("Error en vectorQuery:", error);
    throw error;
  }
};
