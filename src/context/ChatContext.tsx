"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { MessageProps } from "@/components/chat/TemplateMessages";
import { useChat } from "ai/react";

interface MsgUsage {
  kind : string;
  tokens : number;
}

interface ChatContextType {
  input: string;
  messages: MessageProps[];
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    event: React.FormEvent,
    options: { body: { option: string; language: string } }
  ) => void;
  isLoading: boolean;
  stop: () => void;
  /** Nuevo: nombre de la herramienta si hay una llamada activa */
  currentToolCall?: string;
  /** Nuevo: true si estamos esperando la respuesta final (sin tool activa). */
  awaitingResponse: boolean;
  usageTracking : MsgUsage[]
}

// Crear el contexto
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado local para guardar qué herramienta se está llamando
  const [toolCall, setToolCall] = useState<string>();
  const [usageTracking, setUsageTracking] = useState<MsgUsage[]>([]);

  const { input, messages, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      // Similar a tu template: guardamos en state la tool que se llamó
      onToolCall({ toolCall }) {
        setToolCall(toolCall.toolName);
      },
      // Puedes manejar onError también si gustas
      onError(error) {
        console.error("Error en la IA:", error);
      },
      onFinish: (_message, { usage }) => {
        setUsageTracking((prev) => [
          ...prev,
          {
            kind: "prompt",
            tokens: usage.promptTokens,
          },
          {
            kind: "completion",
            tokens: usage.completionTokens,
          },
        ]);
      },
      sendExtraMessageFields : true,
    });

  /**
   * currentToolInvocation:
   *   - Verificamos si el último mensaje del array es de la herramienta
   *   - Comprobamos si coincide con `toolCall` en local state
   */
  const currentToolInvocation = useMemo(() => {
    const lastMessage = messages.slice(-1)[0];
    if (
      lastMessage?.toolInvocations &&
      lastMessage.toolInvocations.length > 0 &&
      lastMessage.toolInvocations[0].toolName === toolCall
    ) {
      return toolCall; // p.ej. "getInformation"
    }
    return undefined;
  }, [messages, toolCall]);



  /**
   * awaitingResponse:
   *   - Si la IA está "isLoading"
   *   - NO hay tool call activa
   *   - Y el último mensaje es del usuario => estamos esperando que la IA conteste
   */
  const awaitingResponse = useMemo(() => {
    if (
      isLoading &&
      !currentToolInvocation &&
      messages.slice(-1)[0]?.role === "user"
    ) {
      return true;
    }
    return false;
  }, [isLoading, currentToolInvocation, messages]);

  return (
    <ChatContext.Provider
      value={{
        input,
        messages,
        handleInputChange,
        handleSubmit,
        isLoading,
        stop,
        usageTracking,
        // Exponemos estas 2 (o 3) props nuevas
        currentToolCall: currentToolInvocation,
        awaitingResponse,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
