"use client";
import React, { createContext, useContext, useState } from "react";


interface Message {
  role: "user" | "model" 
  content: string; 
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeLastMessage: () => void;
  updateLastMessageContent: (content: string) => void; // Add this line
}

// Crear el contexto
const ChatContext = createContext<ChatContextType | undefined>(undefined);


export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);


  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeLastMessage = () => {
    setMessages((prev) => prev.slice(0, prev.length - 1));
  }

  const updateLastMessageContent = (content: string) => {
    setMessages((prevMessages) => {
      if (prevMessages.length === 0) return prevMessages;
      const updatedMessages = [...prevMessages];
      const lastIndex = updatedMessages.length - 1;
      updatedMessages[lastIndex] = {
        ...updatedMessages[lastIndex],
        content: content,
      };
      return updatedMessages;
    });
  };


  return (
    <ChatContext.Provider value={{ messages, addMessage, removeLastMessage, updateLastMessageContent }}>
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
