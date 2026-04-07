"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import { agiCards } from "@/lib/agi-data";

export default function AGIPratica() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mb-12 lg:mb-16"
      >
        <SectionLabel>AGI na prática</SectionLabel>
        <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
          Antes, impossível.
          <br />
          Agora,{" "}
          <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">/faz</span>.
        </h2>
        <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[130%] text-[var(--text-body)] max-w-[500px]">
          2026 é o ano dos agentes que executam,
          não dos chatbots que falam.
          Jarvis{" "}
          <span className="font-jetbrains font-bold text-[var(--text-primary)] bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">/faz</span>{" "}
          desde seu nascimento.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {agiCards.map((card, i) => (
          <motion.div
            key={i}
            variants={fadeBlurUp}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[12px] p-6"
          >
            <span className="font-outfit font-bold text-[7px] tracking-[0.2em] uppercase text-[var(--text-muted)] block mb-2">
              Antes
            </span>
            <p className="font-outfit text-[14px] leading-[150%] text-[var(--text-secondary)] mb-5">
              {card.before}
            </p>
            <span className="font-outfit font-bold text-[7px] tracking-[0.2em] uppercase text-[var(--text-primary)] block mb-2">
              Agora
            </span>
            <p className="font-jetbrains font-bold text-[14px] leading-[150%] text-[var(--text-primary)]">
              {card.after}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
