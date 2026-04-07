"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Phone,
  Calendar,
  Search,
  CreditCard,
  MapPin,
  FileText,
  Brain,
  Shield,
  Mic,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import RemotionPlayer from "@/components/ui/RemotionPlayer";
import { ExecutionAnimation } from "@/remotion/compositions/ExecutionAnimation";
import { IntelligenceAnimation } from "@/remotion/compositions/IntelligenceAnimation";
import FAQ from "@/components/sections/FAQ";

// ─── Capability Data ─────────────────────────────────────────────────────────
type Capability = {
  icon: typeof Phone;
  title: string;
  description: string;
  example: string;
  maturity: "live" | "beta" | "soon";
};

const capabilities: Capability[] = [
  {
    icon: Calendar,
    title: "Agenda inteligente",
    description: "Extrai compromissos de qualquer mensagem. Sync com Google, Apple, Outlook.",
    example: '"Reuniao de pais amanha 19h" → agendado + lembrete',
    maturity: "live",
  },
  {
    icon: Phone,
    title: "Liga por voce",
    description: "Liga pra consultorio, SAC, cliente. Conversa, navega URA, retorna o resultado.",
    example: '"Liga pro Dr. Alberto e marca consulta" → feito',
    maturity: "live",
  },
  {
    icon: Search,
    title: "Busca perto de voce",
    description: "Restaurante, farmacia, medico. Filtra por convenio, horario, distancia.",
    example: '"Farmacia aberta perto de mim" → 3 opcoes + Waze',
    maturity: "live",
  },
  {
    icon: CreditCard,
    title: "Controle financeiro",
    description: "Registra gastos, categoriza, mostra resumo mensal por categoria.",
    example: '"Quanto gastei esse mes?" → R$4.230 por categoria',
    maturity: "live",
  },
  {
    icon: FileText,
    title: "Cofre de documentos",
    description: "Guarda CPF, RG, convenio, passaporte. Usa automaticamente quando precisa.",
    example: '"Qual o CPF da minha esposa?" → enviado do cofre',
    maturity: "live",
  },
  {
    icon: Brain,
    title: "Memoria contextual",
    description: "Aprende preferencias, horarios, familia. Melhora com o uso.",
    example: "Sabe que voce prefere consulta de manha e japones no Itaim",
    maturity: "live",
  },
  {
    icon: MapPin,
    title: "Reserva restaurante",
    description: "Encontra, verifica disponibilidade, reserva a mesa. Voce so aparece.",
    example: '"Reserva Fasano sexta 20h 4 pessoas" → confirmado',
    maturity: "live",
  },
  {
    icon: Mic,
    title: "Cancela servicos",
    description: "Liga pro SAC da operadora, navega menu automatico, faz o cancelamento por voce.",
    example: '"Cancela minha Claro" → ligou, cancelou, confirmou',
    maturity: "live",
  },
  {
    icon: MessageSquare,
    title: "Busca voos",
    description: "Google Flights + milhas em paralelo. Compara precos, mostra como emitir.",
    example: '"Voo SP-Miami marco" → 12 opcoes em 30 segundos',
    maturity: "live",
  },
  // ── Em breve: visao de futuro ──
  {
    icon: CreditCard,
    title: "Negocia por voce",
    description: "Renegocia plano de celular, seguro do carro, mensalidade de escola. Busca o melhor preco.",
    example: '"Renegocia meu plano da Vivo" → economizou R$40/mes',
    maturity: "soon",
  },
  {
    icon: Brain,
    title: "Proativo",
    description: "Antecipa o que voce vai precisar. Avisa antes de voce lembrar. Age sem voce pedir.",
    example: "Seu exame vence em 12 dias. Ja agendei renovacao.",
    maturity: "soon",
  },
  {
    icon: Shield,
    title: "Paga contas",
    description: "Foto do boleto → pago. Integracao bancaria direta. Sem abrir app de banco.",
    example: '"Paga esse boleto" → foto → pago → comprovante',
    maturity: "soon",
  },
];

const maturityLabels = {
  live: { label: "Funcionando", dotColor: "bg-[#4A8C6F]", textColor: "text-[#4A8C6F]" },
  beta: { label: "Em beta", dotColor: "bg-[#D4A843]", textColor: "text-[#B89530]" },
  soon: { label: "No roadmap", dotColor: "bg-[#8E8C84]", textColor: "text-[#8E8C84]" },
};

// ─── Rotating command examples ───────────────────────────────────────────────
const commands = [
  { cmd: "/faz agendar com o 3", result: "Consulta agendada em 47 segundos." },
  { cmd: "/faz ligar pro Ricardo", result: "Ligou, conversou, retornou." },
  { cmd: "/faz cancelar Claro", result: "SAC navegado, cancelado." },
  { cmd: "/faz reservar Fasano", result: "Sexta 20h, 4 pessoas. Confirmado." },
  { cmd: "/faz buscar voo SP-Miami", result: "12 opcoes. Milhas + dinheiro." },
];

// ─── How it works steps ──────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Voce manda", desc: "Texto, audio, foto, PDF. Como quiser. No WhatsApp que ja ta no seu bolso." },
  { num: "02", title: "Jarvis entende", desc: "IA multimodal processa, extrai dados, entende o contexto e decide o que fazer." },
  { num: "03", title: "Jarvis executa", desc: "Liga, agenda, busca, reserva, cancela. Sem voce precisar fazer nada." },
  { num: "04", title: "Voce recebe", desc: "Confirmacao no WhatsApp. Consulta agendada. Reserva feita. Voo encontrado." },
];

// ─── Pain points ─────────────────────────────────────────────────────────────
const painPoints = [
  {
    emoji: "🏥", task: "Marcar consulta",
    without: ["Abrir Doctoralia", "Filtrar por convenio", "Ligar pra 3 consultorios", "Soletrar nome e CPF", "Negociar horario", "Colocar no calendario"],
    timeWithout: "47 min",
    with: '"Dermato com SulAmerica perto de mim" → escolhe → /faz agendar',
    timeWith: "47 seg",
  },
  {
    emoji: "✈️", task: "Achar voo com milhas",
    without: ["Entrar no Smiles", "Entrar na Livelo", "Abrir Google Flights", "Comparar 4 abas", "Calcular milhas vs dinheiro", "Desistir"],
    timeWithout: "2h+ (e desistiu)",
    with: '"voo SP Miami com milhas"',
    timeWith: "30 seg",
  },
  {
    emoji: "🍽️", task: "Reservar restaurante",
    without: ["Pensar onde ir", "Pesquisar no Google", "Ligar ou entrar no site", "Confirmar com a esposa", "Reservar de novo", "Colocar no calendario"],
    timeWithout: "35 min",
    with: '"reserva japones pra sexta"',
    timeWith: "1 min",
  },
];

// ─── WhatsApp Mockup ─────────────────────────────────────────────────────────
function MascotAvatar({ size = 36 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{ width: size, height: size, background: "linear-gradient(135deg, #C4B8A8 0%, #A89B8C 100%)" }}
    >
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 28 28" fill="none">
        <rect x="4" y="2" width="20" height="20" rx="8" fill="#B8AA98" />
        <path d="M9 14 C11 17, 17 17, 19 14" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 2px rgba(212,168,67,0.6))" }} />
        <rect x="9" y="22" width="10" height="5" rx="3" fill="#A89B8C" />
      </svg>
    </div>
  );
}

function WhatsAppChat({ chat }: { chat: { sender: string; text: string; isSuccess?: boolean }[] }) {
  return (
    <div className="w-full max-w-[380px]">
      <div className="bg-[#E5DDD5] rounded-[24px] border-[3px] border-[#1A1A1A]/10 overflow-hidden shadow-xl">
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <MascotAvatar size={36} />
          <div>
            <p className="text-white text-sm font-medium font-outfit">Jarvis</p>
            <p className="text-white/60 text-[10px] font-outfit">online</p>
          </div>
        </div>
        <div className="px-3 py-4 flex flex-col gap-2 min-h-[280px]">
          {chat.map((msg, i) => {
            const isUser = msg.sender === "user";
            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[155%] whitespace-pre-line font-outfit ${
                  isUser
                    ? "bg-[#DCF8C6] text-[#111B21] rounded-tr-sm"
                    : msg.isSuccess
                    ? "bg-[#D4EDDA] text-[#111B21] rounded-tl-sm border border-[#4A8C6F]/20"
                    : "bg-white text-[#111B21] rounded-tl-sm shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-[rgba(74,140,111,0.08)] border-t border-[rgba(74,140,111,0.1)] py-2 text-center">
          <span className="font-outfit text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--success)]">
            Em producao — Nao eh demo
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Showcase conversations ──────────────────────────────────────────────────
const showcaseConversation = [
  { sender: "user", text: "Dermatologistas que aceitam SulAmerica perto de mim" },
  { sender: "jarvis", text: "Achei 3 dermatologistas com SulAmerica perto de voce:\n\n1. Dra. Marina Luz\n   850m · ⭐ 4.8 · seg-sex\n\n2. Clinica Derma Plus\n   1.2km · ⭐ 4.6 · seg-sab\n\n3. Dr. Paulo Mendes\n   2km · ⭐ 4.9 · ter-sex" },
  { sender: "user", text: "/faz agendar com o 3, semana que vem, qualquer horario de manha" },
  { sender: "jarvis", text: "Agendando com Dr. Paulo Mendes. Puxando seus dados do cofre..." },
  { sender: "jarvis", text: "✓ Agendado!\nDr. Paulo Mendes — ter 9h30\nR. Oscar Freire, 1340 — Jardins\n\n📅 Calendario atualizado\n☐ Levar exames recentes\n☐ Carteirinha do convenio\n\nLembrete 1h antes com Waze.", isSuccess: true },
];

const callConversation = [
  { sender: "user", text: "liga pro consultorio do Dr. Alberto e marca consulta pra semana que vem de manha" },
  { sender: "jarvis", text: "Ligando pro consultorio." },
  { sender: "jarvis", text: "📞 Resultado da ligacao\n\nConsulta agendada. Terca 9h, Dr. Alberto.\nCadu (assistente) pediu pra levar exames recentes.\n\nDuracao: 2min 34s", isSuccess: true },
  { sender: "user", text: "perfeito. coloca na agenda." },
  { sender: "jarvis", text: "Feito. Lembrete 1h antes." },
];

// ─── Phone mask ──────────────────────────────────────────────────────────────
function phoneMask(value: string): string {
  let v = value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
  else if (v.length > 2) v = "(" + v.slice(0, 2) + ") " + v.slice(2);
  else if (v.length > 0) v = "(" + v;
  return v;
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════════════════
// ─── Referral helpers ────────────────────────────────────────────────────────
const QUEUE_OFFSET = 247; // Start queue at realistic number
const BACKEND = "https://jarvis-backend-six.vercel.app";

function generateRefCode(name: string): string {
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${clean}${rand}`;
}

function getRefFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}

export default function DemoPage() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // Referral state
  const [queuePosition, setQueuePosition] = useState(0);
  const [refCode, setRefCode] = useState("");
  const [copied, setCopied] = useState(false);
  const referredBy = useRef<string | null>(null);

  useEffect(() => {
    referredBy.current = getRefFromUrl();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCmdIndex((prev) => (prev + 1) % commands.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const refLink = typeof window !== "undefined" && refCode
    ? `${window.location.origin}/demo?ref=${refCode}`
    : "";

  const copyRefLink = () => {
    if (refLink) {
      navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareWhatsApp = () => {
    const text = `Conhece o Jarvis? Assistente no WhatsApp que liga, agenda e resolve por voce. Se cadastra: ${refLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareTwitter = () => {
    const text = `Acabei de entrar na fila do Jarvis — primeiro assistente autonomo do Brasil. Ele liga, agenda e resolve tudo pelo WhatsApp. ${refLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSubmit = async () => {
    setError("");
    if (!name.trim()) { setError("Informe seu nome."); return; }
    const phoneRaw = phone.replace(/\D/g, "");
    if (phoneRaw.length !== 11) { setError("WhatsApp deve ter 11 digitos."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Informe um email valido."); return; }

    setLoading(true);
    try {
      const phoneNum = phoneRaw.startsWith("55") ? phoneRaw : "55" + phoneRaw;
      const code = generateRefCode(name);
      const res = await fetch(`${BACKEND}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp_number: phoneNum,
          email: email.trim(),
          source: "fakedoor",
          referral_code: code,
          referred_by: referredBy.current || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok || res.status === 409) {
        setRefCode(data.referral_code || code);
        // Queue position: offset + user count from backend, or fallback
        const pos = data.queue_position || (QUEUE_OFFSET + Math.floor(Math.random() * 30) + 1);
        setQueuePosition(pos);
        setDone(true);
      } else {
        setError(data.error || "Erro ao cadastrar. Tente novamente.");
        setLoading(false);
      }
    } catch {
      setError("Erro de conexao. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(250,248,245,0.85)] backdrop-blur-[60px] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex items-center justify-between h-16">
          <a href="/demo" className="flex flex-col">
            <span className="font-jetbrains font-bold text-xl tracking-[-0.04em] text-[var(--text-primary)] leading-none">jarvis</span>
            <span className="font-outfit text-[9px] tracking-[0.08em] text-[var(--text-secondary)] mt-0.5 leading-none">by <span className="font-medium">OL</span>pi Technologies</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#na-pratica" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">Na pratica</a>
            <a href="#capacidades" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">Capacidades</a>
            <a href="#sobre" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">Sobre</a>
            <a href="#planos" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">Planos</a>
            <a href="#faq" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">FAQ</a>
          </div>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center px-5 py-2 rounded-button border-2 border-[var(--border-button)] text-[var(--text-primary)] text-sm font-outfit font-medium hover:bg-[rgba(0,0,0,0.04)] transition-colors"
          >
            Quero acesso
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #FAF8F5 0%, #EDE8E3 50%, #DDD5CE 100%)" }}
      >
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }} />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-[1200px] px-6 lg:px-10 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center"
        >
          {/* Left — Text */}
          <motion.div variants={fadeBlurUp} className="flex flex-col gap-6 z-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(74,140,111,0.08)] border border-[rgba(74,140,111,0.15)] text-[13px] font-outfit text-[#4A8C6F]">
                <span className="w-2 h-2 rounded-full bg-[#4A8C6F] animate-pulse" />
                Em producao — usuarios reais
              </span>
            </div>

            <p className="font-outfit text-[13px] tracking-[0.15em] uppercase text-[var(--text-secondary)]">
              O primeiro assistente autonomo do Brasil
            </p>

            <h1 className="font-outfit font-medium text-[clamp(44px,7vw,72px)] leading-[100%] tracking-[-0.03em] text-[var(--text-primary)]">
              Voce manda.
              <br />
              Jarvis{" "}
              <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-3 py-1 rounded-xl text-[var(--accent-highlight)]">
                /faz.
              </span>
            </h1>

            {/* Rotating commands */}
            <div className="min-h-[3em] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cmdIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-outfit text-[clamp(16px,2vw,20px)] leading-[150%]"
                >
                  <span className="font-jetbrains font-bold text-[var(--text-primary)] bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">
                    {commands[cmdIndex].cmd}
                  </span>{" "}
                  <span className="text-[var(--text-body)]">{commands[cmdIndex].result}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="font-outfit text-[16px] leading-[170%] text-[var(--text-body)] max-w-[440px]">
              Agenda consultas, faz ligacoes, reserva restaurantes, busca voos,
              cancela servicos e organiza sua vida.
              Tudo pelo WhatsApp. Sem baixar nada.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-button font-outfit font-medium transition-all duration-200 cursor-pointer bg-[var(--text-primary)] text-white hover:bg-[#2A2724] px-8 py-4 text-base"
              >
                Quero ser dos primeiros
                <ArrowRight size={18} />
              </button>
              <a
                href="#na-pratica"
                className="inline-flex items-center justify-center rounded-button font-outfit font-medium transition-all duration-200 cursor-pointer border-2 border-[var(--border-button)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(0,0,0,0.04)] px-8 py-4 text-base"
              >
                Ver como funciona
              </a>
            </div>

            <p className="font-outfit text-[13px] text-[var(--text-secondary)]">
              Vagas limitadas no beta. Sem cartao.
            </p>
          </motion.div>

          {/* Right — Hero Video */}
          <motion.div variants={fadeBlurUp} className="flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-[480px]">
              <div className="overflow-hidden rounded-[32px]" style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.12))" }}>
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

      {/* ═══ STATS BAR ═══ */}
      <section className="border-y border-[var(--border-subtle)] bg-white/40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8 flex flex-wrap justify-center gap-8 lg:gap-16">
          {[
            { value: "100%", label: "WhatsApp" },
            { value: "47s", label: "pra agendar consulta" },
            { value: "24/7", label: "disponivel" },
            { value: "0", label: "apps pra baixar" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-jetbrains font-bold text-2xl lg:text-3xl text-[var(--text-primary)]">{stat.value}</p>
              <p className="font-outfit text-[13px] text-[var(--text-secondary)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PAIN — Before vs After ═══ */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeBlurUp}>
              <SectionLabel>O problema</SectionLabel>
              <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
                Voce gasta mais tempo
                <br />
                <span className="text-[var(--text-secondary)]">organizando</span> sua vida
                <br />
                do que <span className="text-[var(--text-secondary)]">vivendo</span> ela.
              </h2>
            </motion.div>

            <motion.p variants={fadeBlurUp} className="mt-6 font-outfit text-[clamp(16px,2vw,20px)] leading-[160%] text-[var(--text-body)] max-w-[480px]">
              Cada tarefa simples vira uma jornada por 3 apps, 2 ligacoes e 40 minutos.
            </motion.p>

            <motion.div variants={fadeBlurUp} className="mt-8">
              <Image
                src="/images/jarvis-sitting.jpg"
                alt="Jarvis mascot"
                width={400}
                height={280}
                className="rounded-[24px] object-cover"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="flex flex-col gap-5"
          >
            {painPoints.map((p) => (
              <motion.div key={p.task} variants={fadeBlurUp} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card overflow-hidden">
                <div className="p-5 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span>{p.emoji}</span>
                      <span className="font-outfit font-medium text-[15px] text-[var(--text-primary)]">{p.task}</span>
                    </div>
                    <span className="font-outfit font-bold text-[10px] tracking-[0.15em] uppercase text-[rgba(26,23,20,0.35)]">Sem Jarvis</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {p.without.map((step, i) => (
                      <span key={i} className="font-outfit text-[11px] text-[var(--text-secondary)] bg-[rgba(26,23,20,0.04)] px-2 py-1 rounded-md">{step}</span>
                    ))}
                  </div>
                  <p className="font-jetbrains text-[12px] text-[var(--accent-highlight)] font-bold text-right">{p.timeWithout}</p>
                </div>
                <div className="p-5 bg-[rgba(74,140,111,0.04)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-outfit font-bold text-[10px] tracking-[0.15em] uppercase text-[var(--success)]">Com Jarvis</span>
                    <span className="font-jetbrains text-[12px] text-[var(--success)] font-bold">{p.timeWith}</span>
                  </div>
                  <p className="font-jetbrains font-bold text-[14px] text-[var(--text-primary)]">{p.with}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SHOWCASE — Full Conversation ═══ */}
      <section id="na-pratica" className="py-section" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig} className="mb-16 max-w-[600px]">
            <SectionLabel>Na pratica</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
              Uma mensagem.
              <br />
              Jarvis faz o resto.
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)]">
              Cada pedido encadeia 5-8 etapas automaticamente.{" "}
              <span className="font-jetbrains font-bold text-[var(--text-primary)]">Tudo numa conversa de WhatsApp</span>.
            </p>
          </motion.div>

          {/* Use case 1: Agendar consulta */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-24"
          >
            <motion.div variants={fadeBlurUp}>
              <span className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 block">Consulta medica</span>
              <h3 className="font-outfit font-medium text-[clamp(22px,3vw,32px)] leading-[120%] text-[var(--text-primary)] mb-6">
                <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-2 py-1 rounded-lg text-[0.9em]">/faz agendar com o 3</span>
              </h3>

              <div className="flex flex-col gap-1 mb-6">
                {[
                  { step: "Busca", desc: "Voce pede dermatologistas com convenio perto de voce" },
                  { step: "Recomenda", desc: "Jarvis manda 3 opcoes com distancia e avaliacao" },
                  { step: "Escolhe", desc: 'Voce manda "/faz agendar com o 3, semana que vem de manha"' },
                  { step: "Cofre", desc: "Puxa nome, CPF, email, convenio do cofre automaticamente" },
                  { step: "Agenda", desc: "Faz a reserva da consulta com seus dados" },
                  { step: "Confirma", desc: "Manda confirmacao com endereco e checklist" },
                  { step: "Calendario", desc: "Google Calendar atualizado + lembrete com Waze" },
                ].map((c, i) => (
                  <div key={c.step} className="flex items-start gap-3 py-2 border-l-2 border-[var(--border-light)] pl-4">
                    <span className="w-6 h-6 rounded-full bg-[var(--text-primary)] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <span className="font-outfit font-medium text-[13px] text-[var(--text-primary)]">{c.step}</span>
                      <span className="font-outfit text-[13px] text-[var(--text-secondary)]"> — {c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Image src="/images/jarvis-features.jpg" alt="Jarvis execution" width={400} height={240} className="rounded-[20px] object-cover w-full" style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.06))" }} />
            </motion.div>

            <motion.div variants={fadeBlurUp} className="flex justify-center">
              <WhatsAppChat chat={showcaseConversation} />
            </motion.div>
          </motion.div>

          {/* Use case 2: Ligacao */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
          >
            <motion.div variants={fadeBlurUp} className="flex justify-center lg:order-1">
              <WhatsAppChat chat={callConversation} />
            </motion.div>

            <motion.div variants={fadeBlurUp} className="lg:order-2">
              <span className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 block">Ligacao autonoma</span>
              <h3 className="font-outfit font-medium text-[clamp(22px,3vw,32px)] leading-[120%] text-[var(--text-primary)] mb-6">
                <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-2 py-1 rounded-lg text-[0.9em]">/faz ligar pro Dr. Alberto</span>
              </h3>

              <p className="font-outfit text-[clamp(15px,2vw,18px)] leading-[160%] text-[var(--text-body)] mb-6">
                Jarvis pega o telefone, liga, conversa com a secretaria, agenda e retorna o resultado.
                Voce recebe a confirmacao no WhatsApp.
              </p>

              <div className="flex flex-col gap-1 mb-6">
                {[
                  { step: "Liga", desc: "Discagem automatica pro consultorio" },
                  { step: "Conversa", desc: "Interage com a secretaria naturalmente" },
                  { step: "Agenda", desc: "Negocia horario e confirma" },
                  { step: "Retorna", desc: "Envia resultado completo com transcript" },
                  { step: "Calendario", desc: "Atualiza automaticamente" },
                ].map((c, i) => (
                  <div key={c.step} className="flex items-start gap-3 py-2 border-l-2 border-[var(--border-light)] pl-4">
                    <span className="w-6 h-6 rounded-full bg-[var(--text-primary)] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <span className="font-outfit font-medium text-[13px] text-[var(--text-primary)]">{c.step}</span>
                      <span className="font-outfit text-[13px] text-[var(--text-secondary)]"> — {c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Image src="/images/jarvis-voice.jpg" alt="Jarvis voice" width={400} height={240} className="rounded-[20px] object-cover w-full" style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.06))" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EXECUTION — Remotion Animation ═══ */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <SectionLabel>Execucao</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
              Nenhum assistente no Brasil faz isso.
              <br />
              Literalmente.
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[130%] text-[var(--text-body)]">
              Siri sugere. Alexa responde. Google mostra links.
              <br />
              Jarvis{" "}
              <span className="font-jetbrains font-bold text-[var(--text-primary)] bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">/faz</span>.
            </p>
          </motion.div>

          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <RemotionPlayer component={ExecutionAnimation} durationInFrames={300} />
          </motion.div>
        </div>
      </section>

      {/* ═══ CAPABILITIES GRID ═══ */}
      <section id="capacidades" className="py-section" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[1200px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-16">
            <SectionLabel>Capacidades</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              9 capacidades funcionando.
              <br />
              <span className="text-[var(--text-secondary)]">E o que vem por ai.</span>
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap) => {
              const mat = maturityLabels[cap.maturity];
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  variants={fadeBlurUp}
                  className="group relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-6 hover:bg-white hover:border-[rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(65,62,62,0.04)] flex items-center justify-center">
                      <Icon size={20} className="text-[var(--text-primary)]/50" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-outfit font-medium ${mat.textColor} bg-[rgba(0,0,0,0.03)]`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${mat.dotColor}`} />
                      {mat.label}
                    </span>
                  </div>
                  <h3 className="font-outfit font-medium text-lg text-[var(--text-primary)] mb-2">{cap.title}</h3>
                  <p className="font-outfit text-[14px] leading-[160%] text-[var(--text-secondary)] mb-4">{cap.description}</p>
                  <div className="bg-[rgba(65,62,62,0.03)] rounded-lg px-3 py-2 border border-[rgba(0,0,0,0.03)]">
                    <p className="font-jetbrains text-[12px] text-[var(--text-secondary)]/70">{cap.example}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ INTELLIGENCE — Remotion ═══ */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <RemotionPlayer component={IntelligenceAnimation} durationInFrames={300} />
          </motion.div>

          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <SectionLabel>Inteligencia</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
              Quanto mais usa,
              <br />
              mais ele sabe.
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[160%] text-[var(--text-body)] max-w-[480px]">
              Jarvis aprende seus horarios, preferencias, familia e rotina.
              Na proxima vez, ele ja sabe o que fazer sem perguntar.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Brain, title: "Memoria", desc: "Sabe que voce prefere consulta de manha" },
                { icon: FileText, title: "Documentos", desc: "Guarda CPF, RG, convenio no cofre" },
                { icon: Calendar, title: "Contexto", desc: "Sabe que quinta tem reuniao as 14h" },
                { icon: Shield, title: "Seguro", desc: "Row Level Security. Dados isolados." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(65,62,62,0.04)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <p className="font-outfit font-medium text-[14px] text-[var(--text-primary)]">{item.title}</p>
                      <p className="font-outfit text-[13px] text-[var(--text-secondary)] leading-[150%]">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ COMO FUNCIONA ═══ */}
      <section id="como-funciona" className="py-section border-y border-[var(--border-subtle)]" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[1200px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-16">
            <SectionLabel>Processo</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              Simples assim.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeBlurUp} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%)] w-6 text-[var(--border-light)]">
                    <ChevronRight size={24} />
                  </div>
                )}
                <p className="font-jetbrains text-[40px] font-bold text-[rgba(65,62,62,0.06)] mb-2">{step.num}</p>
                <h3 className="font-outfit font-medium text-xl text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="font-outfit text-[14px] leading-[170%] text-[var(--text-secondary)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ ABOUT US ═══ */}
      <section id="sobre" className="py-section">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[900px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-12">
            <SectionLabel>Sobre</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              A proxima geracao de assistente pessoal.
              <br />
              <span className="text-[var(--text-secondary)]">No WhatsApp.</span>
            </h2>
          </motion.div>

          <motion.p variants={fadeBlurUp} className="font-outfit text-[clamp(16px,2vw,20px)] leading-[180%] text-[var(--text-body)] text-center max-w-[700px] mx-auto mb-12">
            A America Latina conversa pelo WhatsApp. Sao 4 horas por dia, todos os dias.
            Em vez de criar mais um app que ninguem vai baixar, construimos um assistente
            que vive onde voce ja esta. Sem downloads. Sem cadastros complexos. Sem curva de aprendizado.
            Voce manda uma mensagem como mandaria pra qualquer pessoa — e Jarvis executa.
          </motion.p>

          <motion.div variants={fadeBlurUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="font-outfit font-medium text-xl text-[var(--text-primary)] mb-3">Como funciona</h3>
              <div className="space-y-3">
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — Voce manda texto, audio, foto ou PDF no WhatsApp. Como faria com qualquer contato.
                </p>
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — Jarvis processa com IA multimodal, entende o contexto e executa a acao: liga, agenda, busca, reserva, cancela.
                </p>
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — Voce recebe a confirmacao. Sem sair do WhatsApp.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-outfit font-medium text-xl text-[var(--text-primary)] mb-3">Nossa visao</h3>
              <div className="space-y-3">
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — Nao queremos organizar sua vida. Queremos resolve-la. A diferenca entre um assistente e um agente eh que o agente age.
                </p>
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — Hoje Jarvis agenda, liga e reserva. Amanha vai negociar seu plano, pagar suas contas e antecipar o que voce precisa antes de voce pedir.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Statement quote */}
          <motion.div variants={fadeBlurUp} className="text-center py-8 border-t border-b border-[var(--border-subtle)]">
            <p className="font-outfit italic text-[clamp(20px,3.5vw,32px)] leading-[140%] tracking-[-0.01em] text-[var(--text-primary)] max-w-[700px] mx-auto">
              &ldquo;O futuro nao eh um app novo.
              <br />
              Eh alguem que resolve sua vida
              <br />
              numa conversa de WhatsApp.&rdquo;
            </p>
            <p className="font-outfit text-[13px] text-[var(--text-secondary)] mt-4">
              — OLpi Technologies
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ PRICING / LAUNCH ═══ */}
      <section id="planos" className="py-section" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[1000px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-12">
            <SectionLabel>Lancamento</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              Acesso antecipado.
              <br />
              <span className="text-[var(--accent-highlight)]">30 dias gratis.</span>
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)] max-w-[500px] mx-auto">
              Quem se cadastrar agora ganha 30 dias gratis na versao completa Autopilot.
              Sem cartao. Sem compromisso.
            </p>
          </motion.div>

          {/* Plans */}
          <motion.div variants={fadeBlurUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto mb-12">
            {/* Essencial */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-8">
              <p className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-2">Essencial</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-outfit font-medium text-[40px] tracking-[-0.02em] text-[var(--text-primary)]">R$19</span>
                <span className="font-outfit text-[15px] text-[var(--text-secondary)]">,90/mes</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Agenda inteligente com sync",
                  "Busca perto de voce",
                  "Controle financeiro",
                  "Cofre de documentos",
                  "Memoria contextual",
                  "Listas e notas",
                  "500 mensagens/mes",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--success)] mt-0.5 flex-shrink-0" />
                    <span className="font-outfit text-[14px] text-[var(--text-body)]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Autopilot */}
            <div className="bg-[var(--text-primary)] border border-[var(--text-primary)] rounded-card p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="font-outfit font-bold text-[9px] tracking-[0.15em] uppercase bg-[var(--accent-highlight)] text-white px-2.5 py-1 rounded-full">
                  30 dias gratis
                </span>
              </div>
              <p className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-white/50 mb-2">Autopilot</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-outfit font-medium text-[40px] tracking-[-0.02em] text-white">R$69</span>
                <span className="font-outfit text-[15px] text-white/50">,90/mes</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Tudo do Essencial +",
                  "Liga por voce (consultorios, SAC, contatos)",
                  "Reserva restaurantes",
                  "Busca e compara voos",
                  "Cancela servicos",
                  "Execucao autonoma ilimitada",
                  "Mensagens ilimitadas",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--accent-highlight)] mt-0.5 flex-shrink-0" />
                    <span className="font-outfit text-[14px] text-white/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Launch timeline */}
          <motion.div variants={fadeBlurUp} className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card px-8 py-5">
              <div className="text-center">
                <p className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--accent-highlight)] mb-1">Fase 1</p>
                <p className="font-outfit text-[14px] text-[var(--text-primary)] font-medium">Beta privado</p>
                <p className="font-outfit text-[12px] text-[var(--text-secondary)]">Primeiros usuarios</p>
              </div>
              <ChevronRight size={20} className="text-[var(--border-light)] hidden sm:block" />
              <div className="text-center">
                <p className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-1">Fase 2</p>
                <p className="font-outfit text-[14px] text-[var(--text-primary)] font-medium">Beta aberto</p>
                <p className="font-outfit text-[12px] text-[var(--text-secondary)]">Convites expandidos</p>
              </div>
              <ChevronRight size={20} className="text-[var(--border-light)] hidden sm:block" />
              <div className="text-center">
                <p className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-1">Fase 3</p>
                <p className="font-outfit text-[14px] text-[var(--text-primary)] font-medium">Lancamento</p>
                <p className="font-outfit text-[12px] text-[var(--text-secondary)]">Acesso publico</p>
              </div>
            </div>
            <p className="font-outfit text-[14px] text-[var(--text-body)] mt-6">
              Estamos iniciando o beta privado.{" "}
              <span className="font-medium text-[var(--text-primary)]">Muito em breve.</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ FAQ ═══ */}
      <FAQ />

      {/* ═══ LEAD CAPTURE ═══ */}
      <section className="py-[clamp(80px,14vw,180px)]">
        <motion.div
          ref={formRef}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[520px] px-6 text-center"
        >
          <motion.div variants={fadeBlurUp}>
            <Image
              src="/images/jarvis-sparkle.jpg"
              alt="Jarvis pronto"
              width={200}
              height={200}
              className="rounded-[24px] object-cover mx-auto mb-6"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))" }}
            />
          </motion.div>

          <motion.h2
            variants={fadeBlurUp}
            className="font-outfit font-medium text-[clamp(28px,5vw,44px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)] mb-4"
          >
            Quer ser dos primeiros?
          </motion.h2>

          <motion.p
            variants={fadeBlurUp}
            className="font-outfit text-[16px] leading-[160%] text-[var(--text-body)] mb-3 max-w-[420px] mx-auto"
          >
            Cadastre-se e ganhe <span className="font-medium text-[var(--text-primary)]">30 dias gratis</span> na versao completa Autopilot.
          </motion.p>
          <motion.p
            variants={fadeBlurUp}
            className="font-outfit text-[13px] text-[var(--text-secondary)] mb-10"
          >
            Vagas limitadas. Sem cartao.
          </motion.p>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[var(--bg-card)] border border-[rgba(74,140,111,0.2)] rounded-card p-8"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}
            >
              <CheckCircle2 size={48} className="text-[var(--success)] mx-auto mb-4" />
              <h3 className="font-outfit font-medium text-2xl text-[var(--text-primary)] mb-2">Voce esta na fila!</h3>

              {/* Queue position */}
              <div className="bg-[rgba(0,0,0,0.03)] rounded-xl px-6 py-4 mb-6">
                <p className="font-outfit text-[13px] text-[var(--text-secondary)] mb-1">Sua posicao</p>
                <p className="font-jetbrains font-bold text-[36px] text-[var(--text-primary)] leading-none">#{queuePosition}</p>
              </div>

              {/* Referral CTA */}
              <div className="text-left mb-6">
                <h4 className="font-outfit font-medium text-[16px] text-[var(--text-primary)] mb-3 text-center">
                  Indique amigos e suba na fila
                </h4>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-3 bg-[rgba(74,140,111,0.05)] rounded-lg px-4 py-2.5 border border-[rgba(74,140,111,0.1)]">
                    <span className="font-jetbrains font-bold text-[14px] text-[var(--success)]">10</span>
                    <span className="font-outfit text-[13px] text-[var(--text-body)]">indicacoes → <span className="font-medium text-[var(--text-primary)]">3 meses gratis</span></span>
                  </div>
                  <div className="flex items-center gap-3 bg-[rgba(255,92,0,0.05)] rounded-lg px-4 py-2.5 border border-[rgba(255,92,0,0.1)]">
                    <span className="font-jetbrains font-bold text-[14px] text-[var(--accent-highlight)]">20</span>
                    <span className="font-outfit text-[13px] text-[var(--text-body)]">indicacoes → <span className="font-medium text-[var(--text-primary)]">3 meses gratis + 1 ano ao preco Essencial</span></span>
                  </div>
                </div>

                {/* Referral link */}
                <div className="bg-[rgba(0,0,0,0.03)] rounded-xl p-3 mb-4">
                  <p className="font-outfit text-[11px] text-[var(--text-secondary)] uppercase tracking-wider mb-2">Seu link de indicacao</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={refLink}
                      className="flex-1 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg px-3 py-2 font-jetbrains text-[12px] text-[var(--text-primary)] outline-none truncate"
                    />
                    <button
                      onClick={copyRefLink}
                      className="px-3 py-2 rounded-lg bg-[var(--text-primary)] text-white font-outfit text-[12px] font-medium hover:bg-[#2A2724] transition-colors flex-shrink-0"
                    >
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>

                {/* Share buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={shareWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-outfit text-[13px] font-medium transition-colors"
                    style={{ background: "#25D366" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={shareTwitter}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1DA1F2] text-white font-outfit text-[13px] font-medium hover:bg-[#1a8cd8] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Twitter/X
                  </button>
                </div>
              </div>

              <p className="font-outfit text-[13px] text-[var(--text-secondary)] leading-[160%]">
                Vamos te avisar pelo WhatsApp quando sua vaga abrir.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeBlurUp}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-8 text-left"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}
            >
              <div className="space-y-4">
                <div>
                  <label className="font-outfit text-[12px] text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 block">Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(0,0,0,0.2)] outline-none focus:border-[var(--accent-highlight)]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-outfit text-[12px] text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 block">WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(phoneMask(e.target.value))}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(0,0,0,0.2)] outline-none focus:border-[var(--accent-highlight)]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-outfit text-[12px] text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(0,0,0,0.2)] outline-none focus:border-[var(--accent-highlight)]/40 transition-colors"
                  />
                </div>
              </div>

              {error && <p className="font-outfit text-[13px] text-red-600 mt-3">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--text-primary)] text-white font-outfit font-medium text-[15px] hover:bg-[#2A2724] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cadastrando..." : (<>Garantir minha vaga <ArrowRight size={18} /></>)}
              </button>

              <p className="font-outfit text-[12px] text-[var(--text-secondary)]/60 text-center mt-4">
                Sem compromisso. Sem cartao. Sem spam.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[var(--border-subtle)] py-10" style={{ background: "linear-gradient(180deg, #FAF8F5 0%, #F0EBE5 100%)" }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-jetbrains font-bold text-lg tracking-[-0.04em] text-[var(--text-primary)]/60">jarvis</span>
            <span className="font-outfit text-[10px] text-[var(--text-secondary)] mt-0.5">by OLpi Technologies</span>
          </div>
          <p className="font-outfit text-[13px] text-[var(--text-secondary)]">
            Voce manda. Jarvis{" "}
            <span className="font-jetbrains font-bold text-[var(--text-primary)]/60">/faz</span>.
          </p>
          <div className="flex gap-6">
            <a href="/termos" className="font-outfit text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Termos</a>
            <a href="/privacidade" className="font-outfit text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
