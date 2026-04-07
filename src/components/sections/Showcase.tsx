"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import Image from "next/image";

const useCases = [
  {
    label: "Consulta completa",
    command: "/faz marcar dermato",
    image: "/images/jarvis-features.jpg",
    chain: [
      { step: "Memoria", desc: "Sabe seu plano (SulAmerica), CPF do cofre" },
      { step: "Busca", desc: "Dermatologistas que aceitam SulAmerica perto" },
      { step: "Escolha", desc: "3 opcoes com distancia — voce manda '3'" },
      { step: "Executa", desc: "Agenda Dr. Paulo, qui 16h" },
      { step: "Calendario", desc: "Google Calendar atualizado + endereco" },
      { step: "Checklist", desc: "☐ Exames  ☐ Carteirinha" },
      { step: "Lembrete", desc: "1h antes: Waze + checklist" },
    ],
    chat: [
      { sender: "user", text: "/faz marcar dermato" },
      { sender: "jarvis", text: "Encontrei 3 dermatologistas que aceitam SulAmerica perto de voce:" },
      { sender: "jarvis", text: "1. Dra. Marina — ter 14h · 850m\n2. Clinica Derma — qua 10h · 1.2km\n3. Dr. Paulo — qui 16h · 2km" },
      { sender: "user", text: "3" },
      { sender: "jarvis", text: "✓ Confirmado.\nDr. Paulo Mendes — qui 16h\nR. Oscar Freire, 1340\n📅 Calendario atualizado\n☐ Exames  ☐ Carteirinha", isSuccess: true },
    ],
  },
  {
    label: "Voo com milhas",
    command: "/faz buscar voo SP Miami",
    image: "/images/jarvis-voice.jpg",
    chain: [
      { step: "Coleta", desc: "Executiva? Escala? Data flexivel?" },
      { step: "Saldo", desc: "Confirma: 120k Livelo, 50k Smiles" },
      { step: "3 fontes", desc: "Google Flights + seats.aero + scraper" },
      { step: "Resultado", desc: "12 opcoes em R$ estimado" },
      { step: "⭐ Acessivel", desc: "Marca as que cabem no saldo" },
      { step: "Guia", desc: "Passo a passo pra emitir" },
    ],
    chat: [
      { sender: "user", text: "/faz buscar voo SP Miami" },
      { sender: "jarvis", text: "Economica, executiva ou tanto faz?" },
      { sender: "user", text: "executiva" },
      { sender: "jarvis", text: "Seus pontos: 120k Livelo, 50k Smiles. Certo?" },
      { sender: "user", text: "sim" },
      { sender: "jarvis", text: "⭐ ~R$1.800 — 86k Smiles\nGOL direto · exec · 15/jul\n✓ Voce tem pontos!\n\n~R$2.100 — United 1 escala\n💰 R$4.200 — AA direto" },
    ],
  },
  {
    label: "Cancelar servico",
    command: "/faz cancelar minha Claro",
    image: "/images/jarvis-standing.jpg",
    chain: [
      { step: "Cofre", desc: "Puxa CPF e dados automaticamente" },
      { step: "Liga", desc: "Chama 1052 com voz IA em PT-BR" },
      { step: "URA", desc: "Navega menu (4, 2, 1)" },
      { step: "Retencao", desc: "Passa pela oferta de retencao" },
      { step: "Protocolo", desc: "Retorna numero do protocolo" },
    ],
    chat: [
      { sender: "user", text: "/faz cancelar minha Claro" },
      { sender: "jarvis", text: "Entendido. Vou ligar pro 1052 pra cancelar sua Claro." },
      { sender: "jarvis", text: "📞 Ligando..." },
      { sender: "jarvis", text: "✓ Cancelado.\nProtocolo: #8847291\nVoce nao ouviu um segundo de musiquinha.", isSuccess: true },
    ],
  },
];

export default function Showcase() {
  return (
    <section id="execucao" className="py-section">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <motion.div
          variants={fadeBlurUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mb-16 max-w-[600px]"
        >
          <SectionLabel>Como funciona</SectionLabel>
          <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
            Uma mensagem.
            <br />
            Jarvis faz o resto.
          </h2>
          <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)]">
            Cada{" "}
            <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-2 py-0.5 rounded-md">
              /faz
            </span>{" "}
            encadeia 5-7 sistemas automaticamente.
            Nenhum outro assistente faz isso.
          </p>
        </motion.div>

        {/* Use Cases */}
        <div className="flex flex-col gap-24">
          {useCases.map((uc, idx) => (
            <motion.div
              key={uc.label}
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start ${
                idx % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Left — Chain explanation */}
              <motion.div
                variants={fadeBlurUp}
                className={idx % 2 === 1 ? "lg:order-2" : ""}
              >
                <span className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 block">
                  {uc.label}
                </span>
                <h3 className="font-outfit font-medium text-[clamp(22px,3vw,32px)] leading-[120%] text-[var(--text-primary)] mb-6">
                  <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-2 py-1 rounded-lg text-[0.9em]">
                    {uc.command}
                  </span>
                </h3>

                {/* Chain steps */}
                <div className="flex flex-col gap-1 mb-6">
                  {uc.chain.map((c, i) => (
                    <div
                      key={c.step}
                      className="flex items-start gap-3 py-2 border-l-2 border-[var(--border-light)] pl-4"
                    >
                      <span className="w-6 h-6 rounded-full bg-[var(--text-primary)] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-outfit font-medium text-[13px] text-[var(--text-primary)]">
                          {c.step}
                        </span>
                        <span className="font-outfit text-[13px] text-[var(--text-secondary)]">
                          {" "}— {c.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mascot image */}
                <Image
                  src={uc.image}
                  alt={uc.label}
                  width={400}
                  height={240}
                  className="rounded-[20px] object-cover w-full"
                  style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.06))" }}
                />
              </motion.div>

              {/* Right — WhatsApp mockup */}
              <motion.div
                variants={fadeBlurUp}
                className={`flex justify-center ${idx % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="w-full max-w-[380px]">
                  <div className="bg-[#E5DDD5] rounded-[32px] border-[3px] border-[#1A1A1A]/10 overflow-hidden shadow-xl">
                    {/* WhatsApp header */}
                    <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">J</span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Jarvis</p>
                        <p className="text-white/60 text-[10px]">executando...</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="px-3 py-4 flex flex-col gap-2 min-h-[300px]">
                      {uc.chat.map((msg, i) => {
                        const isUser = msg.sender === "user";
                        return (
                          <div
                            key={i}
                            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[155%] whitespace-pre-line ${
                                isUser
                                  ? "bg-[#DCF8C6] text-[#111B21] rounded-tr-sm"
                                  : msg.isSuccess
                                  ? "bg-[#D4EDDA] text-[#111B21] rounded-tl-sm border border-[#4A8C6F]/20"
                                  : "bg-white text-[#111B21] rounded-tl-sm shadow-sm"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Production badge */}
                    <div className="bg-[rgba(74,140,111,0.08)] border-t border-[rgba(74,140,111,0.1)] py-2 text-center">
                      <span className="font-outfit text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--success)]">
                        Em producao · Nao eh demo
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
