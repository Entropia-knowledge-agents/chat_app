"use client";
import React, { createContext, useContext, useState } from "react";


interface Message {
  role: "user" | "model"; 
  content: string; 
}

interface ChatContextType {
  messages: Message[]; 
  addMessage: (message: Message) => void;
}

// Crear el contexto
const ChatContext = createContext<ChatContextType | undefined>(undefined);


export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);


  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
