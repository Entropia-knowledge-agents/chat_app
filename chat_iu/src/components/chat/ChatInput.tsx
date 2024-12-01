"use client";
import { useState } from "react";
import IconButtonChat from "../buttons/IconButtonChat";
import { mockApiResponse } from "@/utils/mockApi";
import { useChat } from "@/context/ChatContext";

export default function ChatInput() {
  const [text, setText] = useState("");
  const { addMessage } = useChat();

  const handleSend = async () => {
    if (text.trim() === "") return;
    setText("");

    addMessage({ role: "user", content: text });

    const response = await mockApiResponse(text);

    addMessage({ role: "model", content: response });

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evitar salto de línea
      handleSend(); // Enviar el mensaje
    }
  };

  return (
    <div className="relative w-full ">
      <textarea
        value={text}
        onKeyDown={handleKeyDown}
        onChange={(e) => setText(e.target.value)}
        className="flex min-h-[100px] max-h-[400px] w-full rounded-lg border border-input bg-neutral-100 px-3 py-3 text-base ring-offset-background placeholder:text-muted-foreground placeholder:text-base placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus:ring-black focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        placeholder="Send a message..."
      ></textarea>

      <div className="absolute bottom-2 right-2 flex space-x-2 z-100">
        <IconButtonChat name="send" onClick={handleSend} />
      </div>
    </div>
  );
}
