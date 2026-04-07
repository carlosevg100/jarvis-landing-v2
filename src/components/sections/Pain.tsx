"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import Image from "next/image";

const painPoints = [
  {
    emoji: "🏥",
    task: "Marcar consulta",
    pain: "Doctoralia, filtro, 3 ligacoes, CPF, soletrar nome, negociar horario, anotar, esquecer de por no calendario",
    time: "47 min",
    jarvis: '"marca meu dermato"',
    jarvisDetail: "Busca por plano + local → opcoes → agenda → calendario → checklist → lembrete com Waze",
    jarvisTime: "47 seg",
  },
  {
    emoji: "✈️",
    task: "Achar voo com milhas",
    pain: "Smiles, Livelo, Google Flights, 4 abas, comparar cash vs milhas, calcular transferencia, desistir",
    time: "2h+ (e desistiu)",
    jarvis: '"voo SP Miami com milhas"',
    jarvisDetail: "3 fontes → 12 opcoes em R$ → ⭐ as que cabem no saldo → guia de emissao",
    jarvisTime: "30 seg",
  },
  {
    emoji: "📞",
    task: "Cancelar servico",
    pain: "0800, tecla 4-2-1, CPF 3x, musiquinha, oferta de retencao, insistir, insistir de novo",
    time: "38 min (de raiva)",
    jarvis: '"cancela minha Claro"',
    jarvisDetail: "Liga 1052 → navega URA → passa retencao → retorna protocolo",
    jarvisTime: "Jarvis liga por voce",
  },
];

export default function Pain() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left — Emotional text + mascot */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeBlurUp}>
            <SectionLabel>O problema</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
              Voce gasta mais tempo
              <br />
              <span className="text-[var(--text-secondary)]">organizando</span> sua vida
              <br />
              do que <span className="text-[var(--text-secondary)]">vivendo</span> ela.
            </h2>
          </motion.div>

          <motion.p
            variants={fadeBlurUp}
            className="mt-6 font-outfit text-[clamp(16px,2vw,20px)] leading-[160%] text-[var(--text-body)] max-w-[480px]"
          >
            Cada tarefa simples vira uma jornada por 3 apps, 2 ligacoes e 40 minutos.
            E amanha comeca tudo de novo.
          </motion.p>

          <motion.div variants={fadeBlurUp} className="mt-8">
            <Image
              src="/images/jarvis-sitting.jpg"
              alt="Jarvis mascot sentado"
              width={400}
              height={280}
              className="rounded-[24px] object-cover"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))" }}
            />
          </motion.div>
        </motion.div>

        {/* Right — Pain vs Jarvis cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="flex flex-col gap-4"
        >
          {painPoints.map((p) => (
            <motion.div
              key={p.task}
              variants={fadeBlurUp}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card overflow-hidden"
            >
              {/* Pain side */}
              <div className="p-5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-outfit font-medium text-[15px] text-[var(--text-primary)]">
                    {p.emoji} {p.task}
                  </span>
                  <span className="font-jetbrains text-[12px] text-[var(--accent-highlight)] font-bold">
                    {p.time}
                  </span>
                </div>
                <p className="font-outfit text-[13px] leading-[160%] text-[var(--text-secondary)]">
                  {p.pain}
                </p>
              </div>

              {/* Jarvis side */}
              <div className="p-5 bg-[rgba(74,140,111,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-jetbrains font-bold text-[14px] text-[var(--text-primary)]">
                    {p.jarvis}
                  </span>
                  <span className="font-jetbrains text-[12px] text-[var(--success)] font-bold">
                    {p.jarvisTime}
                  </span>
                </div>
                <p className="font-outfit text-[13px] leading-[160%] text-[var(--text-body)]">
                  {p.jarvisDetail}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.p
            variants={fadeBlurUp}
            className="mt-4 text-center font-outfit text-[14px] text-[var(--text-secondary)]"
          >
            Sao{" "}
            <span className="font-jetbrains font-bold text-[var(--text-primary)]">3-5 horas por semana</span>{" "}
            perdidas em tarefas que uma mensagem resolveria.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
