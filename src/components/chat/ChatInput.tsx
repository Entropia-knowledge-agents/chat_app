"use client";

import IconButtonChat from "../buttons/IconButtonChat";
import { useChatContext } from "@/context/ChatContext";

interface ChatInputProps {
  option: string;
}

export default function ChatInput({ option }: ChatInputProps) {
  const { input, stop, handleInputChange, handleSubmit, isLoading } =
    useChatContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evitar salto de línea
      handleSubmit( e, { body: { option: option} } ); // Pasa el objeto con los parámetros
    }
  };

  return (
    <div className="relative w-full ">
      <textarea
        value={input}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        disabled={isLoading}
        className="flex min-h-[100px] max-h-[400px] w-full rounded-lg border border-input bg-neutral-100 px-3 py-3 text-base ring-offset-background placeholder:text-muted-foreground placeholder:text-base placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus:ring-black focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        placeholder="Send a message..."
      ></textarea>

      <div className="absolute bottom-2 right-2 flex space-x-2 z-100">
      <IconButtonChat
      name={isLoading ? "stop" : "send"}
      onClick={isLoading ? stop : () => handleSubmit({} as React.FormEvent, { body: { option: option} })}
      />
      </div>
    </div>
  );
}
