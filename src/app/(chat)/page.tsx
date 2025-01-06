"use client";

import ChatInput from "@/components/chat/ChatInput";
import Navbar from "@/components/navbar/Navbar";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { useChatContext } from "@/context/ChatContext";
import { useEffect, useRef } from "react";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const { messages } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);

  return (
    <SessionProvider>
      <div className="h-screen flex flex-col justify-between items-center bg-slate-200 text-slate-700">
        <Navbar />
        <div className="flex-1 overflow-y-auto w-full p-8">
          <div className="w-full justify-center flex items-center">
            <div className="flex justify-center items-center w-full md:w-2/5 pt-10">
              {/* ChatMessages se encarga de la lógica de "loading" + tool calls */}
              <ChatMessages messages={messages} />
            </div>
          </div>
          <div ref={messagesEndRef}></div>
        </div>

        <div className="w-full md:w-2/5 bg-neutral-50 p-6 rounded-xl">
          <ChatInput />
        </div>
      </div>
    </SessionProvider>
  );
}
