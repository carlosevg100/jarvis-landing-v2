"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, viewportConfig } from "@/lib/animations";

type FazBlockProps = {
  command: string;
  steps: string;
};

export default function FazBlock({ command, steps }: FazBlockProps) {
  return (
    <motion.section
      variants={fadeBlurUp}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      className="mx-auto max-w-[1200px] px-6 lg:px-10 py-[clamp(60px,8vw,120px)]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline gap-x-4">
          <span className="font-jetbrains font-bold text-[clamp(3rem,10vw,5rem)] leading-none text-[var(--text-primary)]">
            /faz
          </span>
          <span className="font-outfit font-normal text-[clamp(1rem,2.5vw,1.3rem)] text-[var(--text-secondary)]">
            {command}
          </span>
        </div>
        <span className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
          {steps}
        </span>
      </div>
    </motion.section>
  );
}
