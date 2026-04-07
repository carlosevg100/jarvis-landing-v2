"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

const scenarios = [
  {
    question: "Quero ir pra Miami em setembro. Tenho 80 mil pontos Livelo.",
    discovery:
      "Jarvis busca milhas + dinheiro em paralelo. 12 opções em 30 segundos. Mostra quanto seus pontos cobrem e como emitir.",
    faz: "/faz emitir a opção 3 pela Smiles.",
  },
  {
    question: "Farmácia aberta agora perto de mim?",
    discovery:
      "Jarvis encontra 3 farmácias abertas no seu bairro, com distância, horário e link direto no Waze.",
    faz: "/faz ligar pra Drogasil e reservar Amoxicilina.",
  },
  {
    question: "Qual dermato aceita SulAmérica na Vila Olímpia?",
    discovery:
      "Jarvis busca, filtra por convênio e localização, mostra 3 com horários disponíveis essa semana.",
    faz: "/faz agendar com a número 1.",
  },
  {
    question: "Preciso cancelar minha Claro.",
    discovery:
      "Jarvis já sabe o protocolo. Liga pro SAC, navega a URA automaticamente, pede o cancelamento.",
    faz: "/faz cancelar. Jarvis ligou e resolveu.",
  },
];

export default function ValueProp() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      {/* Headline */}
      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mb-16 lg:mb-20 max-w-[700px]"
      >
        <SectionLabel>O que muda</SectionLabel>
        <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
          Estamos em 2026.
          <br />
          Inteligência artificial reescreve indústrias inteiras.
          <br />
          E você ainda tá ligando pra marcar consulta.
        </h2>
        <div className="mt-6 font-outfit text-[clamp(16px,2vw,20px)] leading-[160%] text-[var(--text-body)]">
          <p>
            Ainda perde 20 minutos reservando restaurante.
            <br />
            Ainda liga pro cliente pra confirmar uma reunião.
            <br />
            Ainda repete seu CPF em cada formulário.
            <br />
            Ainda abre 4 apps pra organizar uma semana.
          </p>
          <p className="mt-4 text-[var(--text-primary)]">
            Seu tempo vale mais que isso.
          </p>
        </div>
      </motion.div>

      {/* Flow intro */}
      <motion.h3
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="font-outfit font-medium text-[clamp(22px,3.5vw,32px)] leading-[130%] text-[var(--text-primary)] mb-10"
      >
        Pergunte. Descubra. Mande{" "}
        <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">
          /faz
        </span>
        .
      </motion.h3>

      {/* Scenario cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {scenarios.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeBlurUp}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-7 flex flex-col gap-5"
          >
            {/* Question */}
            <p className="font-outfit text-[15px] leading-[155%] text-[var(--text-primary)]">
              &ldquo;{s.question}&rdquo;
            </p>

            {/* Discovery */}
            <p className="font-outfit text-[14px] leading-[160%] text-[var(--text-secondary)]">
              {s.discovery}
            </p>

            {/* /faz action */}
            <p className="mt-auto">
              <span className="font-jetbrains font-bold text-[14px] text-[var(--text-primary)] bg-[rgba(65,62,62,0.07)] px-2 py-1 rounded-md">
                {s.faz}
              </span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing line */}
      <motion.p
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mt-12 text-center font-outfit text-[clamp(15px,2vw,18px)] leading-[160%] text-[var(--text-body)]"
      >
        Sem baixar app. Sem abrir Google. Sem ligar pra ninguém.
        <br />
        Perguntou no WhatsApp. Jarvis encontrou. Você mandou{" "}
        <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.07)] px-1.5 py-0.5 rounded-md">
          /faz
        </span>
        .
      </motion.p>
    </section>
  );
}
