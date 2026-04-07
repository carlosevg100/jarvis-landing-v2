"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, viewportConfig } from "@/lib/animations";

export default function Divider({ text }: { text: string }) {
  // Highlight /faz within divider text
  const parts = text.split(/(\/?faz)/g);

  return (
    <motion.div
      variants={fadeBlurUp}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      className="border-t border-b border-[var(--border-subtle)] py-20 lg:py-24"
    >
      <p className="mx-auto max-w-[800px] px-6 text-center font-outfit font-normal text-[clamp(18px,3vw,30px)] leading-[130%] text-[var(--text-primary)]">
        {parts.map((part, i) =>
          part === "/faz" ? (
            <span key={i} className="font-jetbrains font-bold bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">
              /faz
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    </motion.div>
  );
}
