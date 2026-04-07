"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

const milestones = [
  {
    label: "Hoje",
    title: "Agenda e executa",
    description: "Marca consultas, faz reservas, liga pra pessoas, organiza finanças.",
  },
  {
    label: "Em breve",
    title: "Negocia e resolve",
    description: "Compara preços, negocia serviços, resolve pendências burocráticas.",
  },
  {
    label: "Futuro",
    title: "Administra sua vida",
    description: "Gerencia assinaturas, otimiza gastos, antecipa tudo antes de você lembrar.",
  },
];

export default function GrowsWithYou() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mb-12 lg:mb-16"
      >
        <SectionLabel>Evolução</SectionLabel>
        <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)] max-w-[500px]">
          Hoje ele agenda.
          <br />
          Amanhã ele administra.
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {milestones.map((m, i) => (
          <motion.div
            key={m.label}
            variants={fadeBlurUp}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-8 relative"
          >
            <span className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 block">
              {m.label}
            </span>
            <h3 className="font-outfit font-medium text-lg text-[var(--text-primary)] mb-2">
              {m.title}
            </h3>
            <p className="font-outfit text-[15px] leading-[160%] text-[var(--text-body)]">
              {m.description}
            </p>
            {i < milestones.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-[var(--border-light)]" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
