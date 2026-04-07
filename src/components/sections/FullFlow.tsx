"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import { flowChat } from "@/lib/chat-data";

export default function FullFlow() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="text-center mb-12 lg:mb-16"
      >
        <SectionLabel>Como funciona</SectionLabel>
        <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
          Você: uma mensagem.
          <br />
          Jarvis: tudo resolvido.
        </h2>
      </motion.div>

      {/* Phone-style flow */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mx-auto max-w-[400px]"
      >
        <div className="bg-[#E5DDD5] rounded-[32px] border-[3px] border-[#1A1A1A] overflow-hidden">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center">
              <span className="text-white text-xs font-bold">J</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Jarvis</p>
              <p className="text-white/60 text-[10px]">online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="px-3 py-4 flex flex-col gap-2 min-h-[400px]">
            {flowChat.map((msg, i) => {
              const isUser = msg.sender === "user";
              return (
                <motion.div
                  key={i}
                  variants={fadeBlurUp}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[155%] whitespace-pre-line ${
                      isUser
                        ? "bg-[#DCF8C6] text-[#111B21] rounded-tr-sm"
                        : "bg-white text-[#111B21] rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p
          variants={fadeBlurUp}
          className="text-center mt-8 font-outfit text-[15px] text-[var(--text-muted)]"
        >
          Tempo total: 47 segundos.
          <br />
          Sem app. Sem site. Sem ligação.
        </motion.p>
      </motion.div>
    </section>
  );
}
