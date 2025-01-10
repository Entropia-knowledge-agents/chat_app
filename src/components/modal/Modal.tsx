"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ActionButton from "../buttons/ActionButton";
import SendIcon from '@mui/icons-material/Send';

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  px:1,
  borderRadius: 2,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  msgId: string;
  like: boolean | undefined;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BasicModal({ open, setOpen, msgId, like, setLike }: Props) {
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
        setLike(true)
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
      sx={{p:0}}
    >
      {/** 
       * Usamos 'position: relative' para poder poner el botón de cerrar 
       * en la esquina superior derecha con position: absolute 
       */}
      <Box sx={{ ...style, position: "relative" }}>

      

        <Box sx={{ display:'flex', alignContent:'center', justifyContent:'space-between',alignItems:'center', mb:2 }}>

        <h2 className="text-lg text-slate-700 px-4 pt-4">
          {like
            ? "¡Cuéntanos! ¿Qué hicimos bien?"
            : "¡Cuéntanos! ¿En qué podríamos mejorar?"}
        </h2>

        <ActionButton
          onClick={handleClose}
          icon={<CloseIcon />}
          title="Cerrar"
          size="small"
        />

        

          
        

        
        
              
        </Box>

        <Box sx={{mx:2, mb:2}}>

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

        <Box sx={{display:'flex', justifyContent:'flex-end', gap:2}}>

        <Button
          variant="outlined"
          color="error"
          onClick={sendReview}
          disabled={isLoading}
          size="small"
        >
        Eliminar
        </Button>

        <Button
          variant="contained"
          onClick={sendReview}
          disabled={isLoading}
          endIcon={<SendIcon />}
          size="small"

        >
          {isLoading ? "Enviando..." : "Enviar feedback"}
        </Button>


        </Box>
      </Box>
      </Box>
    </Modal>
  );
}

