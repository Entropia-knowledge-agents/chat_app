import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";

/** Opcional: si deseas usar esta constante en el request */
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. Leemos el body
    const { interactionId, feedback, like, deleteReview } = await req.json();

    // 2. Conectamos a la base de datos
    const client = await clientPromise;
    const db = client.db("rag_lab");
    const coll = db.collection("logs");

    // 3. Ejecutamos updateOne
    //    - con $set para actualizar solo esos campos
    //    - upsert: true si deseas que se cree si no existe

    if (deleteReview) {
      await coll.updateOne(
        { interactionId },
        { $unset: { feedback: "", like: "" } },
        { upsert: true }
      );
    } else {
      await coll.updateOne(
        { interactionId },
        { $set: { feedback, like } },
        { upsert: true }
      );
    }

    // 4. Retornamos una respuesta JSON
    return NextResponse.json({
      ok: true,
      message: "Feedback actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar feedback:", error);
    // 5. Manejo de errores, retornando status 500
    return NextResponse.json(
      {
        ok: false,
        error: (error as Error).message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}
