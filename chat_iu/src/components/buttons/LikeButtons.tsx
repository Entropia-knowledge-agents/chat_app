"use client";

import ActionButton from "./ActionButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

export default function ActionButtons() {
  return (
    <div className="flex space-x-2 mt-2">
      
      <ActionButton
        icon={<ContentCopyIcon fontSize="inherit"/>}
        title="Copiar"
        onClick={() => console.log("Copiar mensaje")}
      />

      {/* Botón de like */}
      <ActionButton
        icon={<ThumbUpAltIcon fontSize="inherit" />}
        title="Me gusta"
        onClick={() => console.log("Mensaje marcado como me gusta")}
      />

      {/* Botón de dislike */}
      <ActionButton
        icon={<ThumbDownAltIcon fontSize="inherit" />}
        title="No me gusta"
        onClick={() => console.log("Mensaje marcado como no me gusta")}
      />
    </div>
  );
}
