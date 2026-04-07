"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

export default function InvestmentThesis() {
  return (
    <section className="py-[clamp(80px,12vw,160px)]">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mx-auto max-w-[700px] px-6 lg:px-10 text-center flex flex-col items-center"
      >
        <motion.div variants={fadeBlurUp}>
          <SectionLabel>Nosso princípio</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeBlurUp}
          className="mt-6 font-outfit font-medium text-[clamp(26px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]"
        >
          Pra isso que a inteligência artificial existe.
        </motion.h2>

        <motion.div
          variants={fadeBlurUp}
          className="mt-10 flex flex-col gap-6 font-outfit text-[clamp(16px,2vw,20px)] leading-[160%] text-[var(--text-body)]"
        >
          <p>
            Não pra te prender em mais uma tela.
            <br />
            Não pra te dar mais um app.
            <br />
            Não pra te mostrar o que você poderia fazer.
          </p>

          <p className="font-medium text-[var(--text-primary)]">
            Pra fazer por você.
          </p>

          <p>
            Pra que marcar consulta não tome sua hora de almoço.
            <br />
            Pra que confirmar reunião não interrompa seu foco.
            <br />
            Pra que a burocracia do dia a dia
            pare de roubar o tempo que é seu.
          </p>
        </motion.div>

        <motion.p
          variants={fadeBlurUp}
          className="mt-12 font-outfit font-medium text-[clamp(22px,3.5vw,36px)] leading-[130%] tracking-[-0.02em] text-[var(--text-primary)]"
        >
          Jarvis existe pra você fazer
          <br />
          o que só você pode fazer.
        </motion.p>
      </motion.div>
    </section>
  );
}
