"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import Image from "next/image";

/* ── Mascot avatar for WhatsApp headers ── */
function MascotAvatar({ size = 36 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #C4B8A8 0%, #A89B8C 100%)",
      }}
    >
      {/* Simplified mascot head — rounded shape + golden smile */}
      <svg
        width={size * 0.7}
        height={size * 0.7}
        viewBox="0 0 28 28"
        fill="none"
      >
        {/* Head */}
        <rect x="4" y="2" width="20" height="20" rx="8" fill="#B8AA98" />
        {/* Golden smile */}
        <path
          d="M9 14 C11 17, 17 17, 19 14"
          stroke="#D4A843"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          style={{ filter: "drop-shadow(0 0 2px rgba(212,168,67,0.6))" }}
        />
        {/* Body hint */}
        <rect x="9" y="22" width="10" height="5" rx="3" fill="#A89B8C" />
      </svg>
    </div>
  );
}

/* ── WhatsApp chat mockup component ── */
function WhatsAppMockup({
  chat,
  badge,
  status = "executando...",
}: {
  chat: { sender: string; text: string; isSuccess?: boolean }[];
  badge?: string;
  status?: string;
}) {
  return (
    <div className="w-full max-w-[380px]">
      <div className="bg-[#E5DDD5] rounded-[32px] border-[3px] border-[#1A1A1A]/10 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <MascotAvatar size={36} />
          <div>
            <p className="text-white text-sm font-medium">Jarvis</p>
            <p className="text-white/60 text-[10px]">{status}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="px-3 py-4 flex flex-col gap-2 min-h-[300px]">
          {chat.map((msg, i) => {
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

        {/* Badge */}
        <div className="bg-[rgba(74,140,111,0.08)] border-t border-[rgba(74,140,111,0.1)] py-2 text-center">
          <span className="font-outfit text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--success)]">
            {badge || "Em producao · Nao eh demo"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────── */
/*  MAIN USE CASES                            */
/* ────────────────────────────────────────── */

const mainUseCases = [
  {
    label: "Consulta medica",
    command: "/faz marcar dermato",
    image: "/images/jarvis-features.jpg",
    chain: [
      { step: "Entende", desc: "Voce quer um dermatologista" },
      { step: "Memoria", desc: "Puxa seu plano (SulAmerica) e regiao" },
      { step: "Busca", desc: "Acha dermatologistas que aceitam SulAmerica perto" },
      { step: "Opcoes", desc: "Mostra 3 opcoes com distancia e horarios" },
      { step: "Agenda", desc: "Voce escolhe, Jarvis confirma" },
      { step: "Calendario", desc: "Google Calendar atualizado + endereco" },
      { step: "Checklist", desc: "Exames e carteirinha pra nao esquecer" },
      { step: "Lembrete", desc: "1h antes: Waze + checklist" },
    ],
    chat: [
      { sender: "user", text: "marca dermato pra mim" },
      { sender: "jarvis", text: "Vi que seu plano eh SulAmerica Executivo. Vou buscar dermatologistas perto de voce que aceitam." },
      { sender: "jarvis", text: "Encontrei 3 opcoes:\n\n1. Dra. Marina Luz\n   ter 14h · 850m · ⭐ 4.8\n\n2. Clinica Derma Plus\n   qua 10h · 1.2km · ⭐ 4.6\n\n3. Dr. Paulo Mendes\n   qui 16h · 2km · ⭐ 4.9" },
      { sender: "user", text: "3" },
      { sender: "jarvis", text: "Preciso do seu CPF pra confirmar. Posso usar o que ta no cofre?" },
      { sender: "user", text: "sim" },
      { sender: "jarvis", text: "✓ Agendado!\nDr. Paulo Mendes — qui 16h\nR. Oscar Freire, 1340 — Jardins\n\n📅 Calendario atualizado\n☐ Levar exames recentes\n☐ Carteirinha do convenio\n\nVou te lembrar 1h antes com Waze.", isSuccess: true },
    ],
  },
  {
    label: "Jantar completo",
    command: "reserva restaurante pra sexta",
    image: "/images/jarvis-sparkle.jpg",
    chain: [
      { step: "Coleta", desc: "Pergunta detalhes que faltam" },
      { step: "Confirma", desc: "Liga pra esposa pra combinar" },
      { step: "Escolhe", desc: "Mostra opcoes no bairro preferido" },
      { step: "Reserva", desc: "Faz a reserva pelo WhatsApp do restaurante" },
      { step: "Calendario", desc: "Adiciona no Google Calendar dos dois" },
      { step: "Compartilha", desc: "Manda link da localizacao pra esposa" },
    ],
    chat: [
      { sender: "user", text: "reserva restaurante pra sexta" },
      { sender: "jarvis", text: "Pra quantas pessoas? Tem preferencia de culinaria ou bairro?" },
      { sender: "user", text: "2 pessoas, japones no Itaim" },
      { sender: "jarvis", text: "A Helena vai junto? Quer que eu confirme com ela?" },
      { sender: "user", text: "sim, pergunta se sexta 20h ta bom" },
      { sender: "jarvis", text: "Falei com a Helena — sexta 20h ok! ✓\n\nAchei 3 japoneses no Itaim:\n1. Murakami — ⭐ 4.8 · R$180/pessoa\n2. Aizome — ⭐ 4.7 · R$150/pessoa\n3. Sushi Hiroshi — ⭐ 4.9 · R$220/pessoa" },
      { sender: "user", text: "1" },
      { sender: "jarvis", text: "✓ Reservado!\nMurakami — sex 20h · 2 pessoas\nR. Joaquim Floriano, 456\n\n📅 Calendar atualizado (seu e da Helena)\n📍 Link da localizacao enviado pra Helena", isSuccess: true },
    ],
  },
  {
    label: "Voo com milhas",
    command: "/faz buscar voo SP Miami",
    image: "/images/jarvis-voice.jpg",
    chain: [
      { step: "Coleta", desc: "Pergunta classe, datas, flexibilidade" },
      { step: "Saldo", desc: "Verifica seus pontos em cada programa" },
      { step: "Busca", desc: "Google Flights + seats.aero + scrapers" },
      { step: "Compara", desc: "Calcula custo em R$ de cada opcao" },
      { step: "Marca", desc: "⭐ nas que cabem no seu saldo" },
      { step: "Guia", desc: "Passo a passo pra emitir a escolhida" },
    ],
    chat: [
      { sender: "user", text: "quero ir pra Miami em julho" },
      { sender: "jarvis", text: "Economica ou executiva? Data flexivel ou fixa?" },
      { sender: "user", text: "executiva, pode ser qualquer dia em julho" },
      { sender: "jarvis", text: "Quantos pontos voce tem? Quais programas?\n(Se quiser, me manda print do saldo que eu leio)" },
      { sender: "user", text: "120k Livelo e 50k Smiles" },
      { sender: "jarvis", text: "Achei 8 opcoes. As melhores:\n\n⭐ GRU→MIA · 15/jul · GOL exec\n   86k Smiles (~R$1.800)\n   ✓ Cabe no seu saldo!\n\n⭐ GRU→MIA · 22/jul · United 1 escala\n   95k Livelo (~R$2.100)\n   ✓ Cabe no seu saldo!\n\n💰 GRU→MIA · 18/jul · AA direto\n   R$4.200 (sem milhas)\n\nQuer que eu monte o passo a passo pra emitir alguma?" },
    ],
  },
];

/* ────────────────────────────────────────── */
/*  SECONDARY USE CASES (card grid)           */
/* ────────────────────────────────────────── */

const secondaryUseCases = [
  {
    emoji: "📞",
    title: "Liga pro contato",
    example: '"liga pro Joao e marca reuniao pra terca"',
    detail: "Jarvis liga pro contato, se apresenta como seu assistente, e resolve. Voce recebe o resumo.",
  },
  {
    emoji: "👩‍👧",
    title: "Grupo de maes",
    example: "Encaminha msg do grupo da escola",
    detail: "Jarvis le, extrai datas e eventos, coloca no calendario e te avisa so o que importa.",
  },
  {
    emoji: "🔐",
    title: "Cofre de documentos",
    example: '"qual meu CPF?" "manda meu passaporte"',
    detail: "CPF, RG, CNH, passaporte — guarda seguro e manda na hora que voce precisa.",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Agenda da familia",
    example: '"agenda da Olivia essa semana"',
    detail: "Consulta a agenda de qualquer membro da familia. Natacao, escola, medico — tudo integrado.",
  },
  {
    emoji: "💰",
    title: "Gestao financeira",
    example: '"quanto gastei esse mes?" "paga boleto"',
    detail: "Rastreia gastos, categoriza, manda resumo semanal. Foto de boleto → pago.",
  },
  {
    emoji: "📞",
    title: "Cancelar servico",
    example: '"cancela minha Claro"',
    detail: "Liga pro 0800, navega a URA, passa pela retencao e retorna o protocolo.",
    badge: "Em testes",
  },
];

export default function Showcase() {
  return (
    <section id="execucao" className="py-section">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Header */}
        <motion.div
          variants={fadeBlurUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mb-16 max-w-[600px]"
        >
          <SectionLabel>Na pratica</SectionLabel>
          <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
            Uma mensagem.
            <br />
            Jarvis faz o resto.
          </h2>
          <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)]">
            Cada pedido encadeia 5-8 etapas automaticamente.
            Memoria, busca, execucao, calendario, lembrete —{" "}
            <span className="font-jetbrains font-bold text-[var(--text-primary)]">
              tudo numa conversa de WhatsApp
            </span>.
          </p>
        </motion.div>

        {/* ── Main Use Cases ── */}
        <div className="flex flex-col gap-24">
          {mainUseCases.map((uc, idx) => (
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
                <WhatsAppMockup chat={uc.chat} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Secondary Use Cases Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mt-32"
        >
          <motion.div variants={fadeBlurUp} className="mb-12">
            <h3 className="font-outfit font-medium text-[clamp(24px,3vw,36px)] leading-[120%] text-[var(--text-primary)]">
              E muito mais.
            </h3>
            <p className="mt-3 font-outfit text-[clamp(15px,2vw,18px)] leading-[150%] text-[var(--text-body)] max-w-[500px]">
              Cada semana o Jarvis aprende novos poderes.
              Esses ja estao funcionando:
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {secondaryUseCases.map((uc) => (
              <motion.div
                key={uc.title}
                variants={fadeBlurUp}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[16px] p-6 relative"
              >
                {/* Badge */}
                {uc.badge && (
                  <span className="absolute top-4 right-4 font-outfit text-[9px] font-bold tracking-[0.15em] uppercase bg-[rgba(212,168,67,0.12)] text-[#B8930F] px-2 py-1 rounded-full">
                    {uc.badge}
                  </span>
                )}

                <span className="text-2xl mb-3 block">{uc.emoji}</span>
                <h4 className="font-outfit font-medium text-[16px] text-[var(--text-primary)] mb-1">
                  {uc.title}
                </h4>
                <p className="font-jetbrains text-[12px] text-[var(--text-secondary)] mb-3 leading-[150%]">
                  {uc.example}
                </p>
                <p className="font-outfit text-[13px] text-[var(--text-body)] leading-[160%]">
                  {uc.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
