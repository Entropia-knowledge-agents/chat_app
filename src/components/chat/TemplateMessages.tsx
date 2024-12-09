// ModelMessages.tsx

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ActionButtons from "../buttons/LikeButtons";
import { Markdown } from "@/components/utils/Markdown";

interface MessageProps {
  content: string;
}

export function ModelMessages({ content }: MessageProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-11 flex items-start space-x-2">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center border p-2 border-gray-200">
            <AutoAwesomeIcon fontSize="small" className="text-black" />
          </div>
        </div>

        <div
          className="inline-block max-w-full py-1 px-2 text-black"
          style={{
            wordBreak: "break-word", // Permite dividir palabras largas para evitar desbordamiento.
            maxWidth: "100%", // Define un ancho máximo del contenedor.
            height: "100%", // Define una altura fija del contenedor.
            maxHeight: "100%", // Establece la altura máxima.
            overflowY: "auto", // Habilita el desplazamiento vertical cuando el contenido supera la altura.
            padding: "10px", // Añade un relleno interno para mejorar la presentación.
          }}
        >
          <Markdown>{content as string}</Markdown>
          <ActionButtons />
        </div>
      </div>

      <div className="col-span-1"></div>
    </div>
  );
}

export function UserMessages({ content }: MessageProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"></div>

      <div className="col-span-10 flex justify-end">
        <div className="inline-block max-w-full rounded-lg bg-violet-800 text-white px-3 py-2">
          <Markdown>{content as string}</Markdown>
        </div>
      </div>
    </div>
  );
}
