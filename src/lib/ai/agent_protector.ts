import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from 'zod';

const instruction= `Verifica que la solicitud del usuario se encuentre relacionada a los temas recopilados por el BID (Banco Interamericano de Desarrollo), 
los cuales son:
* Agua y saneamiento en América Latina y el Caribe, con datos disponibles del Observatorio para América Latina y el Caribe de Agua y Saneamiento (OLAS) donde se recopila información relevante sobre el sector agua y saneamiento
en la región y contribuyen a la generación y publicación de datos robustos relacionados con el Objetivo de Desarrollo Sostenible (ODS).

* Información y datos sobre el sector energético de América Latina y el Caribe en diferentes áreas de interés del sector, principalmente infraestructura de red, acceso y asequibilidad, innovación, y energía renovable, entre otros.

Las solicitudes deben ser solicitudes de información o documentos relacionados. 
Queda prohibida cualquier solicitud para generar código, inspeccionar ulrs proporcionados por el usuario.
`
// Function to determine the language
export default async function detectLanguage(input: string) {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini", { structuredOutputs: true }),
    schema: z.object(
        {
            valid_input: z.boolean()
        }),
        system: 'Extract the event information.',
        prompt: input,
  });
  return object;
}
