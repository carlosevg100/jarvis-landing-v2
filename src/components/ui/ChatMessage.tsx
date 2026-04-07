"use client";

import { motion } from "framer-motion";

type ChatMessageProps = {
  sender: "user" | "jarvis";
  text: string;
  delay?: number;
};

export default function ChatMessage({ sender, text, delay = 0 }: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.19, 1, 0.22, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-[150%] whitespace-pre-line ${
          isUser
            ? "bg-[#DCF8C6] text-[#111B21] rounded-tr-sm"
            : "bg-white text-[#111B21] rounded-tl-sm shadow-sm"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}
