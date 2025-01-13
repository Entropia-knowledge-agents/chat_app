"use client";

import ChatInput from "@/components/chat/ChatInput";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/navbar/Sidebar";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { useChatContext } from "@/context/ChatContext";
import React, { useEffect, useRef, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const { messages } = useChatContext();
  const [option, setOption] = useState<string>("OLAS");
  const [language, setLanguage] = useState<string>("es");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <SessionProvider>
      <div className="h-screen flex">
        {/* Sidebar */}
        <Sidebar
          option={option}
          setOption={setOption}
        />
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-between items-center bg-slate-300 text-slate-700">
          <Navbar />
          <div className="flex-1 overflow-y-auto w-full p-8 rounded-tl-3xl bg-slate-200 shadow-xl">
            <div className="w-full justify-center flex items-center">
              <div className="flex justify-center items-center w-full md:w-2/5 pt-10 ">
                {/* ChatMessages se encarga de la lógica de "loading" + tool calls */}
                <ChatMessages messages={messages} />
              </div>
            </div>
            <div ref={messagesEndRef}></div>
            
          </div>
          <div className="w-full bg-slate-200 flex justify-center shadow-xl" >
          <div className="md:w-2/5 bg-slate-100 p-6 rounded-xl">
            <ChatInput option={option} />
          </div>
          <div className="w-full md:w-2/5 bg-neutral-50 p-6 rounded-xl">
          <ChatInput option={option}/>
          </div>
        </div>
      </div>
    </div>
    </SessionProvider>
  );
}
