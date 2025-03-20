import { azure } from '@ai-sdk/azure';
import { generateText } from "ai";
import detectLanguage from "@/lib/ai/language";
import { NextResponse } from "next/server";

// Definimos la interfaz para el body de la request
interface RequestBody {
    message: string;
}

export async function POST(req: Request) {
try {
    // Validación básica de la request
    if (!req.body) {
        return NextResponse.json(
            { error: "Request body is required" },
            { status: 400 }
        );
    }

    // Parse del body con tipo
    const { message }: RequestBody = await req.json();

    // Validación del mensaje
    if (!message || typeof message !== "string") {
        return NextResponse.json(
            { error: "Message is required and must be a string" },
            { status: 400 }
        );
    }

    // Detectar idioma
    const language = await detectLanguage(message);

    // Generación del título
    const { text } = await generateText({
        model: azure("gpt-4o-mini"),
        temperature: 0.3,
        system: `Eres un especialista en crear títulos concisos y descriptivos.
            - Los títulos deben tener entre 3-10 palabras
            - No uses signos de puntuación al final
            - Mantén el título en una sola línea
            - Usa mayúsculas solo donde sea gramaticalmente correcto
            - Responde en ${language}`,
        prompt: `Genera un título en ${language} que capture la esencia principal del siguiente mensaje.
        
        Mensaje: ${message}
        
        Título:`,
    });

    // Validación de la respuesta
    if (!text) {
        return NextResponse.json(
            { error: "Failed to generate title" },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        title: text,
    });
    } catch (error) {
    console.error("Error generating title:", error);
    return NextResponse.json(
        {
            success: false,
            error: "Internal server error",
            message: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
        );
    }
}
