"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import RemotionPlayer from "@/components/ui/RemotionPlayer";
import { ExecutionAnimation } from "@/remotion/compositions/ExecutionAnimation";
import { executionCards } from "@/lib/features-data";

export default function Execution() {
  return (
    <section id="execucao" className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
        <motion.div
          variants={fadeBlurUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <SectionLabel>Execução</SectionLabel>
          <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
            Nenhum assistente no Brasil faz isso.
            <br />
            Literalmente.
          </h2>
          <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[130%] text-[var(--text-body)]">
            Siri sugere. Alexa responde. Google mostra links.
            <br />
            Jarvis{" "}
            <span className="font-jetbrains font-bold text-[var(--text-primary)] bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">/faz</span>.
          </p>
        </motion.div>

        <motion.div
          variants={fadeBlurUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <RemotionPlayer component={ExecutionAnimation} durationInFrames={300} />
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {executionCards.map((card) => (
          <motion.div
            key={card.title}
            variants={fadeBlurUp}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-7"
          >
            <h3 className="font-outfit font-medium text-lg text-[var(--text-primary)] mb-2">
              {card.title}
            </h3>
            <p className="font-outfit text-sm leading-[160%] text-[var(--text-secondary)]">
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
