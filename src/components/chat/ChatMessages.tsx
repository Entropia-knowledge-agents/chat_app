"use client";

import { useChat } from "@/context/ChatContext";
import UserMessages from "./UserMessages";
import ModelMessages from "./ModelMessages";


export default function ChatMessages() {
  const { messages } = useChat();

  return (
    <div className="w-full p-1 space-y-4">
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserMessages key={index} content={message.content} />
        ) : (
          <ModelMessages key={index} content={message.content} />
        )
      )}
    </div>
  );
}


