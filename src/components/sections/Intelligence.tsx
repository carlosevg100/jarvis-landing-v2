"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import Image from "next/image";

const memories = [
  {
    category: "Saude",
    items: [
      "Convenio: SulAmerica · plano executivo",
      "Prefere consulta de manha",
      "Alergia a dipirona",
    ],
  },
  {
    category: "Documentos",
    items: [
      "CPF, RG, passaporte no cofre",
      "Carteira de vacinacao digitalizada",
      "Comprovante de residencia atualizado",
    ],
  },
  {
    category: "Preferencias",
    items: [
      "Japones no Itaim — favorito",
      "Nao gosta de escala longa em voo",
      "Helena confirma melhor por ligacao",
    ],
  },
  {
    category: "Agenda",
    items: [
      "Quinta 14h — reuniao fixa",
      "Sabado livre a partir de 11h",
      "Filho tem natacao ter/qui 17h",
    ],
  },
];

export default function Intelligence() {
  return (
    <section id="inteligencia" className="py-section bg-[rgba(74,140,111,0.03)]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Text */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeBlurUp}>
              <SectionLabel>Inteligencia</SectionLabel>
              <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
                Conhece voce
                <br />
                de verdade.
              </h2>
              <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)] max-w-[480px]">
                Quantas vezes voce repetiu seu CPF esse mes?
                Jarvis guarda uma vez. Usa sempre que precisa.
                Quanto mais voce usa, mais inteligente ele fica.
              </p>
            </motion.div>

            <motion.div variants={fadeBlurUp} className="mt-8">
              <Image
                src="/images/jarvis-features.jpg"
                alt="Jarvis conhece voce"
                width={440}
                height={280}
                className="rounded-[24px] object-cover w-full"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))" }}
              />
            </motion.div>
          </motion.div>

          {/* Right — Memory cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="flex flex-col gap-4"
          >
            {memories.map((mem) => (
              <motion.div
                key={mem.category}
                variants={fadeBlurUp}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
                  <span className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)]">
                    {mem.category}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {mem.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 pl-4 border-l-2 border-[var(--border-light)]"
                    >
                      <span className="font-outfit text-[13px] leading-[160%] text-[var(--text-body)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={fadeBlurUp}
              className="bg-[rgba(74,140,111,0.06)] border border-[rgba(74,140,111,0.15)] rounded-card p-5 text-center"
            >
              <p className="font-outfit text-[14px] text-[var(--text-body)]">
                Nenhum outro assistente sabe que voce tem{" "}
                <span className="font-jetbrains font-bold text-[var(--text-primary)]">
                  reuniao quinta 14h
                </span>{" "}
                e nao sugere consulta as 14h30.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
