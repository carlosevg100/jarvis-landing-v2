"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";
import RotatingHooks from "./RotatingHooks";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FAF8F5 0%, #EDE8E3 50%, #DDD5CE 100%)",
      }}
    >
      {/* Subtle warm glow */}
      <div
        className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-[1200px] px-6 lg:px-10 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center"
      >
        {/* Left — Text */}
        <motion.div variants={fadeBlurUp} className="flex flex-col gap-6 z-10">
          <p className="font-outfit text-[13px] tracking-[0.15em] uppercase text-[var(--text-secondary)]">
            Assistente pessoal autonomo no WhatsApp
          </p>

          <h1 className="font-outfit font-medium text-[clamp(40px,6.5vw,64px)] leading-[105%] tracking-[-0.03em] text-[var(--text-primary)]">
            Voce manda.
            <br />
            Jarvis{" "}
            <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-3 py-1 rounded-xl">
              /faz.
            </span>
          </h1>

          <RotatingHooks />

          <p className="font-outfit text-[16px] leading-[170%] text-[var(--text-body)] max-w-[440px]">
            Um assistente que agenda consultas, faz ligacoes, busca voos,
            controla suas financas e resolve sua vida.
            Tudo dentro do WhatsApp. Sem baixar nada.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
            <Button href="#planos" size="lg">
              Teste gratis por 7 dias
            </Button>
          </div>

          <p className="font-outfit text-[13px] text-[var(--text-secondary)]">
            Sem cartao. Cancela quando quiser.
          </p>
        </motion.div>

        {/* Right — Mascot Video */}
        <motion.div
          variants={fadeBlurUp}
          className="flex justify-center lg:justify-end z-10"
        >
          <div className="relative w-full max-w-[480px]">
            <div
              className="overflow-hidden rounded-[32px]"
              style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.12))" }}
            >
              <video
                src="/images/jarvis-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[360px] lg:h-[440px] object-cover object-center"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
