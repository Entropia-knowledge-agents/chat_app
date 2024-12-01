"use client";

import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import Navbar from "@/components/navbar/Navbar";
import { useChat } from "@/context/ChatContext";
import { useEffect, useRef } from "react";

export default function Home() {

  const { messages } = useChat(); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <Navbar />
      <div className="flex-1 overflow-y-auto w-full  p-8">
        <div className="   w-full justify-center flex items-center">
          <div className="flex justify-center items-center w-2/5 pt-10">
            <ChatMessages />
          </div>
        </div>
        <div ref={messagesEndRef}></div>
      </div>

      <div className="w-2/5 bg-neutral-50 p-6">
        <ChatInput />
      </div>
    </div>
  );
}