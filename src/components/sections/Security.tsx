"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { Shield, Lock, Eye, Database } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const features = [
  {
    icon: Lock,
    title: "Cofre criptografado",
    desc: "CPF, convênio, documentos — tudo em cofre isolado com encryption em repouso e em trânsito.",
  },
  {
    icon: Shield,
    title: "Row Level Security",
    desc: "Cada usuário acessa apenas seus dados. Isolamento total no banco de dados.",
  },
  {
    icon: Eye,
    title: "Você no controle",
    desc: "Seus dados nunca são vendidos ou usados pra treinar modelos. Você deleta quando quiser.",
  },
  {
    icon: Database,
    title: "Infraestrutura auditável",
    desc: "Supabase, Vercel, Railway. Monitoramento 24/7 com Sentry e PostHog.",
  },
];

export default function Security() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mb-12 lg:mb-16 text-center max-w-[600px] mx-auto"
      >
        <SectionLabel>Segurança por design</SectionLabel>
        <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
          Personalizado pra você.
          <br />
          Blindado por padrão.
        </h2>
        <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)]">
          Jarvis conhece seus documentos, sua agenda, sua família.
          Essa confiança exige segurança de verdade — não marketing.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeBlurUp}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-7"
          >
            <f.icon
              size={22}
              strokeWidth={1.5}
              className="text-[var(--text-primary)] mb-4"
            />
            <h3 className="font-outfit font-medium text-base text-[var(--text-primary)] mb-2">
              {f.title}
            </h3>
            <p className="font-outfit text-[14px] leading-[160%] text-[var(--text-secondary)]">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
