"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import Image from "next/image";
import { Smartphone, Mic, Camera, Forward, FileText, MapPin } from "lucide-react";

const channels = [
  {
    icon: Smartphone,
    label: "Texto",
    example: '"marca dermato pra semana que vem"',
  },
  {
    icon: Mic,
    label: "Audio",
    example: "Manda um audio de 30s — Jarvis entende tudo",
  },
  {
    icon: Camera,
    label: "Foto",
    example: "Foto do boleto → pago. Foto do remedio → alarme.",
  },
  {
    icon: FileText,
    label: "PDF / Doc",
    example: "Encaminha contrato → resumo + alertas",
  },
  {
    icon: Forward,
    label: "Encaminhamento",
    example: "Encaminha conversa → Jarvis extrai o que importa",
  },
  {
    icon: MapPin,
    label: "Localizacao",
    example: "Manda pin → restaurantes perto que aceitam VR",
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="py-section">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Mascot + visual */}
          <motion.div
            variants={fadeBlurUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="flex justify-center"
          >
            <div className="relative">
              <Image
                src="/images/jarvis-voice.jpg"
                alt="Jarvis entende qualquer formato"
                width={460}
                height={340}
                className="rounded-[28px] object-cover"
                style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.1))" }}
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm border border-[var(--border-subtle)] rounded-2xl px-4 py-3 shadow-lg">
                <p className="font-jetbrains text-[11px] font-bold text-[var(--success)]">
                  6 formatos aceitos
                </p>
                <p className="font-outfit text-[10px] text-[var(--text-secondary)]">
                  texto · audio · foto · pdf · fwd · pin
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Text + channel grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeBlurUp}>
              <SectionLabel>Experiencia</SectionLabel>
              <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
                Manda como quiser.
                <br />
                Jarvis entende.
              </h2>
              <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)] max-w-[480px]">
                Texto, audio, foto, PDF, encaminhamento, localizacao.
                Tudo dentro do WhatsApp que voce ja usa.
                Zero apps. Zero cadastros.
              </p>
            </motion.div>

            {/* Channel grid */}
            <motion.div
              variants={fadeBlurUp}
              className="mt-8 grid grid-cols-2 gap-3"
            >
              {channels.map((ch) => (
                <div
                  key={ch.label}
                  className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--border-light)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ch.icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-[var(--text-primary)]"
                    />
                    <span className="font-outfit font-medium text-[13px] text-[var(--text-primary)]">
                      {ch.label}
                    </span>
                  </div>
                  <p className="font-outfit text-[12px] leading-[155%] text-[var(--text-secondary)]">
                    {ch.example}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
