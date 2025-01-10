"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
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
  rounded: 'md'
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
  console.log(msgId);
  const handleClose = () => setOpen(false);

  const sendReview = async () => {
    setIsLoading(true);
    try {
      // Ajusta la ruta y la lógica del fetch según tu backend
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interactionId: msgId,
          feedback: "", // Puedes añadir un campo si deseas
          like: like, // true, false, o undefined
        }),
      });
      if (!res.ok) {
        // Maneja error
        console.error("Error al enviar feedback");
      } else {
        console.log("Feedback enviado con éxito");
      }
    } catch (err) {
      console.error("Error de fetch:", err);
    } finally {
      // Cerrar el modal después de enviar
      setIsLoading(true);
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
      <Box sx={style}>
        <h2 className='text-slate-700 mb-3 text-lg'>
          {like? "Cuentanos! Que hicimos bien?":"Cuentanos! En qué podríamos mejorar?"}
        </h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isLoading}
          className="flex min-h-[100px] max-h-[400px] w-full text-slate-900 rounded-lg border border-input bg-neutral-100 px-3 py-3 text-base ring-offset-background placeholder:text-muted-foreground placeholder:text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus:ring-slate- focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          placeholder="tu retroalimentación es muy valiosa."
        ></textarea>
        <ActionButton
        onClick={handleClose}
        icon={<CloseIcon/>}
        title='Cerrar'
        />
        <Button onClick={sendReview}>Send!</Button>
      </Box>
    </Modal>
  );
}
