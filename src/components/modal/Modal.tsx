"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ActionButton from "../buttons/ActionButton";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  // Añadimos un ligero redondeado de esquinas vía MUI:
  borderRadius: 2,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  msgId: string;
  like: boolean | undefined;
}

export default function BasicModal({ open, setOpen, msgId, like }: Props) {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const sendReview = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interactionId: msgId,
          feedback,
          like, // true, false, o undefined
        }),
      });
      if (!res.ok) {
        console.error("Error al enviar feedback");
      } else {
        console.log("Feedback enviado con éxito");
      }
    } catch (err) {
      console.error("Error de fetch:", err);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/** 
       * Usamos 'position: relative' para poder poner el botón de cerrar 
       * en la esquina superior derecha con position: absolute 
       */}
      <Box sx={{ ...style, position: "relative" }}>
        {/** Botón de Cerrar en la esquina superior derecha */}
        <ActionButton
          onClick={handleClose}
          icon={<CloseIcon />}
          title="Cerrar"
          style={{ position: "absolute", top: 8, right: 8 }}
        />

        <h2 className="mb-3 text-lg text-slate-700">
          {like
            ? "¡Cuéntanos! ¿Qué hicimos bien?"
            : "¡Cuéntanos! ¿En qué podríamos mejorar?"}
        </h2>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isLoading}
          className="
            mb-4
            w-full
            min-h-[120px]
            max-h-[400px]
            rounded-md
            border
            border-slate-300
            bg-neutral-100
            px-3
            py-2
            text-base
            text-slate-900
            placeholder:text-slate-500
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:cursor-not-allowed
            disabled:opacity-50
            resize-none
          "
          placeholder="Tu retroalimentación es muy valiosa."
        />

        {/**
         * Botón para enviar el feedback
         * (Podrías usar también ActionButton si deseas un estilo unificado)
         */}
        <Button
          variant="contained"
          onClick={sendReview}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar feedback"}
        </Button>
      </Box>
    </Modal>
  );
}
