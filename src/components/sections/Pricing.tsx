"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { plans } from "@/lib/pricing-data";
import { useRegisterModal } from "@/components/ui/RegisterModalProvider";

export default function Pricing() {
  const { openModal } = useRegisterModal();

  return (
    <section id="planos" className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mb-12 lg:mb-16 text-center"
      >
        <SectionLabel>Planos</SectionLabel>
        <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
          Quanto custa nao ter que fazer nada.
        </h2>
        <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[130%] text-[var(--text-body)] max-w-[550px] mx-auto">
          Voce gasta 2h por semana marcando consulta,
          reservando mesa, ligando pra confirmar.
          Sao 104 horas por ano. 13 dias uteis.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={fadeBlurUp}
            className={`relative bg-[var(--bg-card)] border rounded-card-lg p-8 flex flex-col ${
              plan.popular
                ? "border-[var(--text-primary)] border-2"
                : "border-[var(--border-subtle)]"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-8 px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] font-outfit font-bold tracking-[0.15em] uppercase rounded-full">
                Popular
              </span>
            )}

            <div className="mb-6">
              <h3 className="font-outfit font-bold text-sm tracking-[0.1em] uppercase text-[var(--text-secondary)] mb-3">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="font-jetbrains font-bold text-[36px] text-[var(--text-primary)]">
                  {plan.price}
                </span>
                <span className="font-outfit text-sm text-[var(--text-secondary)]">
                  {plan.period}
                </span>
              </div>
              <p className="mt-2 font-outfit text-sm text-[var(--text-body)]">
                {plan.tagline}
              </p>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check size={16} strokeWidth={2} className="text-[var(--success)] mt-0.5 shrink-0" />
                  <span className="font-outfit text-sm text-[var(--text-body)] leading-[150%]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={openModal}
              className="w-full inline-flex items-center justify-center rounded-button font-outfit font-medium transition-all duration-200 cursor-pointer border-2 border-[var(--border-button)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(0,0,0,0.04)] px-7 py-4 text-sm"
            >
              {plan.cta}
            </button>

            <p className="mt-4 font-outfit text-[12px] text-[var(--text-secondary)] text-center whitespace-pre-line">
              {plan.footnote}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mt-10 text-center"
      >
        <p className="font-outfit text-sm text-[var(--text-body)]">
          Teste gratis por 7 dias com{" "}
          <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">/faz</span> ilimitado.
          <br />
          Depois voce decide se quer voltar a fazer tudo sozinho.
        </p>
        <p className="mt-2 font-outfit text-[13px] text-[var(--text-secondary)]">
          Sem cartao. Cancela quando quiser.
        </p>
      </motion.div>
    </section>
  );
}
