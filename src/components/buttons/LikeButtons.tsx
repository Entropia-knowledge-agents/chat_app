"use client";

import ActionButton from "./ActionButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Modal from "@/components/modal/Modal";
import { useState } from "react";

export default function ActionButtons({ msgId }: { msgId: string }) {
  /**
   * 'like' puede ser:
   *   - true (like activo)
   *   - false (dislike activo)
   *   - undefined (sin selección)
   */
  const [like, setLike] = useState<boolean | undefined>();

  /**
   * Maneja si el modal está abierto (true) o cerrado (false).
   */
  const [open, setOpen] = useState(false);

  /**
   * Manejo de clic en "Me gusta".
   * Si ya estaba en `true`, lo desmarcamos (a `undefined`).
   * Si no, lo marcamos a `true`.
   * Además, abrimos el modal.
   */
  const handleLike = () => {
    setLike((prevLike) => (prevLike === true ? undefined : true));
    setOpen(true);
  };

  /**
   * Manejo de clic en "No me gusta".
   * Si ya estaba en `false`, lo desmarcamos (a `undefined`).
   * Si no, lo marcamos a `false`.
   * Además, abrimos el modal.
   */
  const handleDislike = () => {
    setLike((prevLike) => (prevLike === false ? undefined : false));
    setOpen(true);
  };

  return (
    <div className="flex space-x-2 mt-2">
      {/* Al modal le pasamos las props que necesita */}
      <Modal open={open} setOpen={setOpen} msgId={msgId} like={like} />

      {/* Botón de like */}
      <ActionButton
        icon={<ThumbUpAltIcon fontSize="inherit" />}
        title="Me gusta"
        onClick={handleLike}
        // Si like es true => color "primary", de lo contrario => "default"
        color={like === true ? "primary" : "default"}
      />

      {/* Botón de dislike */}
      <ActionButton
        icon={<ThumbDownAltIcon fontSize="inherit" />}
        title="No me gusta"
        onClick={handleDislike}
        // Si like es false => color "warning", de lo contrario => "default"
        color={like === false ? "warning" : "default"}
      />
    </div>
  );
}
