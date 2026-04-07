"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useRegisterModal } from "@/components/ui/RegisterModalProvider";
import Image from "next/image";

export default function FinalCTA() {
  const { openModal } = useRegisterModal();

  return (
    <section className="py-[clamp(80px,14vw,180px)] relative overflow-hidden">
      {/* Subtle warm glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(74,140,111,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mx-auto max-w-[700px] px-6 text-center flex flex-col items-center gap-8 relative z-10"
      >
        <motion.div variants={fadeBlurUp}>
          <Image
            src="/images/jarvis-sparkle.jpg"
            alt="Jarvis pronto pra resolver"
            width={280}
            height={280}
            className="rounded-[32px] object-cover mx-auto"
            style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.1))" }}
          />
        </motion.div>

        <motion.h2
          variants={fadeBlurUp}
          className="font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]"
        >
          Amanha voce acorda
          <br />
          com tudo resolvido.
        </motion.h2>

        <motion.p
          variants={fadeBlurUp}
          className="font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)] max-w-[480px]"
        >
          Consulta agendada. Reserva confirmada. Voo encontrado.
          <br />
          Enquanto voce dormia, Jarvis{" "}
          <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">
            /fez
          </span>
          .
        </motion.p>

        <motion.div variants={fadeBlurUp}>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-button font-outfit font-medium transition-all duration-200 cursor-pointer border-2 border-[var(--border-button)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(0,0,0,0.04)] px-8 py-4 text-base"
          >
            Teste gratis por 7 dias
          </button>
        </motion.div>

        <motion.p
          variants={fadeBlurUp}
          className="font-outfit text-[13px] text-[var(--text-secondary)]"
        >
          Sem cartao. Cancela quando quiser.
        </motion.p>
      </motion.div>
    </section>
  );
}
