"use client";

import ChatMessage from "./ChatMessage";
import { heroChat } from "@/lib/chat-data";

export default function PhoneMockup() {
  return (
    <div
      className="animate-float"
      style={{ filter: "drop-shadow(0 40px 30px rgba(0,0,0,0.1))" }}
    >
      <div className="relative w-[280px] h-[560px] bg-[#E5DDD5] rounded-[40px] border-[3px] border-[#1A1A1A] overflow-hidden mx-auto">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-[#1A1A1A] rounded-b-2xl z-10" />

        {/* Status bar */}
        <div className="relative z-10 pt-[6px] px-5 flex items-center justify-between h-[28px]">
          <span className="text-[9px] font-medium text-white/0">9:41</span>
        </div>

        {/* WhatsApp header */}
        <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">J</span>
          </div>
          <div>
            <p className="text-white text-[12px] font-medium leading-tight">Jarvis</p>
            <p className="text-white/60 text-[9px]">online</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="px-2 py-3 flex flex-col gap-1.5 h-[430px] overflow-hidden">
          {heroChat.map((msg, i) => (
            <ChatMessage
              key={i}
              sender={msg.sender}
              text={msg.text}
              delay={0.3 + i * 0.6}
            />
          ))}
        </div>

        {/* Input bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[10px] text-[#999]">
            Mensagem
          </div>
          <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
