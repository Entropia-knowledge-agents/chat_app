"use client";
import React, { createContext, useContext } from "react";
import { useChat } from "ai/react";

interface ChatContextType {
  input: string;
  messages: { id: string; content: string; role: string }[];
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

// Crear el contexto
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { input, messages, handleInputChange, handleSubmit, isLoading } =
    useChat({});

  return (
    <ChatContext.Provider
      value={{
        input, 
        messages,
        handleInputChange,
        handleSubmit,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
