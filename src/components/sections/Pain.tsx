"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import Image from "next/image";

const painPoints = [
  {
    emoji: "🏥",
    task: "Marcar consulta",
    without: [
      "Abrir Doctoralia",
      "Filtrar por convenio e especialidade",
      "Ligar pra 3 consultorios",
      "Soletrar nome e CPF",
      "Negociar horario",
      "Anotar endereco",
      "Colocar no calendario",
    ],
    timeWithout: "47 min",
    with: "\"marca meu dermato\"",
    withDetail: "Jarvis busca, filtra por plano, mostra opcoes, agenda, atualiza calendario e manda lembrete com Waze.",
    timeWith: "47 seg",
  },
  {
    emoji: "✈️",
    task: "Achar voo com milhas",
    without: [
      "Entrar no Smiles",
      "Entrar na Livelo",
      "Abrir Google Flights",
      "Comparar 4 abas",
      "Calcular milhas vs dinheiro",
      "Descobrir como transferir",
      "Desistir",
    ],
    timeWithout: "2h+ (e desistiu)",
    with: "\"voo SP Miami com milhas\"",
    withDetail: "Jarvis pergunta seus pontos, busca em 3 fontes, calcula em R$, marca as que cabem no saldo e monta guia de emissao.",
    timeWith: "30 seg",
  },
  {
    emoji: "🍽️",
    task: "Reservar restaurante",
    without: [
      "Pensar onde ir",
      "Pesquisar no Google",
      "Ligar ou entrar no site",
      "Confirmar com a esposa",
      "Reservar de novo pra outro horario",
      "Colocar no calendario",
      "Mandar localizacao",
    ],
    timeWithout: "35 min",
    with: "\"reserva japones pra sexta\"",
    withDetail: "Jarvis confirma com sua esposa, mostra opcoes, reserva, coloca no calendario e manda a localizacao pros dois.",
    timeWith: "1 min",
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
          className="flex flex-col gap-5"
        >
          {painPoints.map((p) => (
            <motion.div
              key={p.task}
              variants={fadeBlurUp}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card overflow-hidden"
            >
              {/* Sem Jarvis */}
              <div className="p-5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>{p.emoji}</span>
                    <span className="font-outfit font-medium text-[15px] text-[var(--text-primary)]">
                      {p.task}
                    </span>
                  </div>
                  <span className="font-outfit font-bold text-[10px] tracking-[0.15em] uppercase text-[rgba(26,23,20,0.35)]">
                    Sem Jarvis
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.without.map((step, i) => (
                    <span
                      key={i}
                      className="font-outfit text-[11px] text-[var(--text-secondary)] bg-[rgba(26,23,20,0.04)] px-2 py-1 rounded-md"
                    >
                      {step}
                    </span>
                  ))}
                </div>
                <p className="font-jetbrains text-[12px] text-[var(--accent-highlight)] font-bold text-right">
                  {p.timeWithout}
                </p>
              </div>

              {/* Com Jarvis */}
              <div className="p-5 bg-[rgba(74,140,111,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-outfit font-bold text-[10px] tracking-[0.15em] uppercase text-[var(--success)]">
                    Com Jarvis
                  </span>
                  <span className="font-jetbrains text-[12px] text-[var(--success)] font-bold">
                    {p.timeWith}
                  </span>
                </div>
                <p className="font-jetbrains font-bold text-[14px] text-[var(--text-primary)] mb-1">
                  {p.with}
                </p>
                <p className="font-outfit text-[13px] leading-[160%] text-[var(--text-body)]">
                  {p.withDetail}
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
