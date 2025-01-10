"use client";

import ActionButton from "./ActionButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { useChatContext } from "@/context/ChatContext";

export default function ActionButtons({ msgId }: { msgId: string }) {

  const { isLoading } = useChatContext();

  const [like, setLike] = useState<"like" | "dislike" | "neutral">("neutral");

  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<"like" | "dislike" >("like");

  const handleLike = (origin:"like" | "dislike" ) => {
    setOpen(true);
    setOrigin(origin);
  };

  return (
    <div className="flex space-x-2 mt-2">
      {/* Al modal le pasamos las props que necesita */}
      <Modal open={open} 
      setOpen={setOpen} 
      msgId={msgId} 
      like={like}
      setLike={setLike}    
      origin={origin}   
      />

      {/* Botón de like */}
      <ActionButton
        icon={<ThumbUpAltIcon fontSize="inherit" />}
        title="Me gusta"
        onClick={() => handleLike("like")}
        color={like === "like" ? "primary" : "default"}
        disabled={isLoading}
      />

      {/* Botón de dislike */}
      <ActionButton
        icon={<ThumbDownAltIcon fontSize="inherit" />}
        title="No me gusta"
        onClick={() => handleLike("dislike")}
        color={like === "dislike" ? "warning" : "default"}
        disabled={isLoading}
      />
    </div>
  );
}
