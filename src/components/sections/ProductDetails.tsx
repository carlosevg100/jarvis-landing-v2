"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeBlurUp, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

const tabs = [
  {
    label: "Execução",
    features: [
      { title: "Agendamento Autônomo", desc: "Navega Doctoralia e outros sites, preenche formulário com dados do cofre, agenda" },
      { title: "Ligações por Voz", desc: "Liga pra SAC, cliente, consultório. Navega URA automaticamente, conversa e resolve" },
      { title: "Busca de Voos", desc: "Milhas + dinheiro em paralelo. Google Flights + seats.aero. Instrução de emissão" },
      { title: "Busca na Região", desc: "Restaurante, farmácia, médico perto de você. Filtros por convênio, VR/VA, horário" },
      { title: "Reserva de Restaurante", desc: "Google Reserve, Tagme ou formulário direto. Nome da reserva automático do perfil" },
      { title: "Cancelamento de Serviço", desc: "Liga pro SAC, navega URA/DTMF, pede cancelamento. Telecom, academia, etc." },
    ],
  },
  {
    label: "Organização",
    features: [
      { title: "Agenda Inteligente", desc: "Extrai compromissos de texto, áudio, foto. Categoriza, detecta conflito, cria recorrência" },
      { title: "Sync 3 Calendários", desc: "Google Calendar, Apple Calendar, Outlook — bidirecional com notificação de mudanças" },
      { title: "Cofre de Documentos", desc: "CPF, RG, CNH, convênio, receita, exame. Extrai dados e usa automaticamente" },
      { title: "Listas e Notas", desc: "Cria, adiciona, marca como feito. Notas vinculadas a compromissos" },
      { title: "Controle Financeiro", desc: "Registra gastos e receitas, despesas fixas, resumo mensal, projeção anual" },
      { title: "Morning Digest", desc: "Resumo do dia às 9h: agenda, pendências, lembretes, finanças" },
    ],
  },
  {
    label: "Inteligência",
    features: [
      { title: "4 Formatos de Entrada", desc: "Texto, áudio (Whisper), imagem (Vision), PDF/documento — entende tudo" },
      { title: "Perfil Contextual", desc: "Aprende família, pets, trabalho, médicos, convênio, preferências de horário" },
      { title: "Saldo de Milhas", desc: "Livelo, Smiles, Azul, LATAM Pass, Nubank, Inter — sabe quanto você tem" },
      { title: "Anti-duplicata", desc: "Dice similarity impede salvar o mesmo compromisso duas vezes" },
      { title: "Disambiguation", desc: "Quando ambíguo, lista opções numeradas. Aceita rejeição" },
      { title: "Conflito de Horário", desc: "Avisa se já tem algo marcado no mesmo horário" },
    ],
  },
  {
    label: "Infraestrutura",
    features: [
      { title: "Calendários", desc: "Google Calendar, Apple Calendar (CalDAV), Outlook (Microsoft Graph)" },
      { title: "Voos", desc: "Google Flights via Apify, seats.aero (milhas fixas + dinâmicas), multi-rota" },
      { title: "Busca Local", desc: "Google Places com filtros por convênio, VR/VA, rating, horário. Links Maps/Waze" },
      { title: "Segurança", desc: "E2E encryption, Row Level Security, cofre isolado por usuário" },
      { title: "Integrações", desc: "WhatsApp, Doctoralia, Google Reserve, Tagme, Twilio, ElevenLabs" },
      { title: "Milhas/Pontos", desc: "Livelo, Esfera, iupp, Smiles, Azul, LATAM Pass, Nubank, Inter" },
    ],
  },
];

export default function ProductDetails() {
  const [active, setActive] = useState(0);

  return (
    <section id="tecnologia" className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="mb-10"
      >
        <SectionLabel>Tecnologia</SectionLabel>
        <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
          Por dentro do Jarvis.
        </h2>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-button text-sm font-outfit font-medium whitespace-nowrap transition-all ${
              active === i
                ? "bg-[var(--text-primary)] text-white"
                : "border border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {tabs[active].features.map((f) => (
            <div
              key={f.title}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-6"
            >
              <h3 className="font-outfit font-medium text-base text-[var(--text-primary)] mb-2">
                {f.title}
              </h3>
              <p className="font-outfit text-sm leading-[160%] text-[var(--text-body)]">
                {f.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
