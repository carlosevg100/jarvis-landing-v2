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
  ChevronDown,
} from "lucide-react";
import { fadeBlurUp, staggerContainer, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import RemotionPlayer from "@/components/ui/RemotionPlayer";
import { ExecutionAnimation } from "@/remotion/compositions/ExecutionAnimation";
import { IntelligenceAnimation } from "@/remotion/compositions/IntelligenceAnimation";
import * as Accordion from "@radix-ui/react-accordion";

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
    title: "Smart scheduling",
    description: "Extracts appointments from any message. Syncs with Google, Apple, Outlook.",
    example: '"Parent meeting tomorrow 7pm" → scheduled + reminder',
    maturity: "live",
  },
  {
    icon: Phone,
    title: "Makes calls for you",
    description: "Calls doctor offices, customer service, contacts. Talks, navigates IVR, returns the result.",
    example: '"Call Dr. Smith and book an appointment" → done',
    maturity: "live",
  },
  {
    icon: Search,
    title: "Search near you",
    description: "Restaurants, pharmacies, doctors. Filters by insurance, hours, distance.",
    example: '"Pharmacy open near me" → 3 options + directions',
    maturity: "live",
  },
  {
    icon: CreditCard,
    title: "Financial tracking",
    description: "Logs expenses, categorizes, shows monthly summary by category.",
    example: '"How much did I spend this month?" → $4,230 by category',
    maturity: "live",
  },
  {
    icon: FileText,
    title: "Document vault",
    description: "Stores SSN, insurance, passport. Uses them automatically when needed.",
    example: '"What\'s my wife\'s insurance number?" → sent from vault',
    maturity: "live",
  },
  {
    icon: Brain,
    title: "Contextual memory",
    description: "Learns your preferences, schedule, family. Gets better with use.",
    example: "Knows you prefer morning appointments and Italian in Midtown",
    maturity: "live",
  },
  {
    icon: MapPin,
    title: "Restaurant reservations",
    description: "Finds availability, books the table. You just show up.",
    example: '"Book Nobu Friday 8pm 4 people" → confirmed',
    maturity: "live",
  },
  {
    icon: Mic,
    title: "Cancel services",
    description: "Calls the carrier, navigates the automated menu, handles the cancellation for you.",
    example: '"Cancel my AT&T plan" → called, canceled, confirmed',
    maturity: "live",
  },
  {
    icon: MessageSquare,
    title: "Flight search",
    description: "Google Flights + miles in parallel. Compares prices, shows how to book.",
    example: '"Flight NYC to Miami March" → 12 options in 30 seconds',
    maturity: "live",
  },
  // ── Coming soon: future vision ──
  {
    icon: CreditCard,
    title: "Negotiates for you",
    description: "Renegotiates phone plans, car insurance, subscriptions. Finds the best price.",
    example: '"Renegotiate my Verizon plan" → saved $40/month',
    maturity: "soon",
  },
  {
    icon: Brain,
    title: "Proactive",
    description: "Anticipates what you need. Alerts before you remember. Acts without being asked.",
    example: "Your passport expires in 12 days. Already scheduled renewal.",
    maturity: "soon",
  },
  {
    icon: Shield,
    title: "Pays bills",
    description: "Photo of the bill → paid. Direct bank integration. No opening bank apps.",
    example: '"Pay this bill" → photo → paid → receipt',
    maturity: "soon",
  },
];

const maturityLabels = {
  live: { label: "Live", dotColor: "bg-[#4A8C6F]", textColor: "text-[#4A8C6F]" },
  beta: { label: "In beta", dotColor: "bg-[#D4A843]", textColor: "text-[#B89530]" },
  soon: { label: "Roadmap", dotColor: "bg-[#8E8C84]", textColor: "text-[#8E8C84]" },
};

// ─── Rotating command examples ───────────────────────────────────────────────
const commands = [
  { cmd: "/do book appointment #3", result: "Appointment booked in 47 seconds." },
  { cmd: "/do call Ricardo", result: "Called, talked, returned." },
  { cmd: "/do cancel AT&T", result: "IVR navigated, canceled." },
  { cmd: "/do book Nobu", result: "Friday 8pm, 4 people. Confirmed." },
  { cmd: "/do search flight NYC-Miami", result: "12 options. Miles + cash." },
];

// ─── How it works steps ──────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "You send", desc: "Text, voice, photo, PDF. However you want. On the WhatsApp already in your pocket." },
  { num: "02", title: "Jarvis understands", desc: "Multimodal AI processes, extracts data, understands context and decides what to do." },
  { num: "03", title: "Jarvis executes", desc: "Calls, books, searches, reserves, cancels. Without you having to do anything." },
  { num: "04", title: "You receive", desc: "Confirmation on WhatsApp. Appointment booked. Reservation made. Flight found." },
];

// ─── Pain points ─────────────────────────────────────────────────────────────
const painPoints = [
  {
    emoji: "\uD83C\uDFE5", task: "Book a doctor",
    without: ["Open ZocDoc", "Filter by insurance", "Call 3 offices", "Spell name and SSN", "Negotiate time", "Add to calendar"],
    timeWithout: "47 min",
    with: '"Dermatologists that take Aetna near me" → pick one → /do book',
    timeWith: "47 sec",
  },
  {
    emoji: "\u2708\uFE0F", task: "Find flights with miles",
    without: ["Check United MileagePlus", "Check Amex points", "Open Google Flights", "Compare 4 tabs", "Calculate miles vs cash", "Give up"],
    timeWithout: "2h+ (and gave up)",
    with: '"flight NYC Miami with miles"',
    timeWith: "30 sec",
  },
  {
    emoji: "\uD83C\uDF7D\uFE0F", task: "Book a restaurant",
    without: ["Think where to go", "Search on Google", "Call or open website", "Check with your partner", "Rebook for another time", "Add to calendar"],
    timeWithout: "35 min",
    with: '"book Italian for Friday"',
    timeWith: "1 min",
  },
];

// ─── FAQ data (English) ─────────────────────────────────────────────────────
const faqItemsEn = [
  {
    question: "How does Jarvis work?",
    answer: "You save Jarvis as a contact on WhatsApp and send a message. You can send text, voice, photos, PDFs or forwards. Jarvis understands everything and executes. No app, no signup, no learning curve.",
  },
  {
    question: "What is /do?",
    answer: "It's the command that activates Jarvis's autonomous execution. When you type /do, it stops organizing and starts ACTING: navigates websites, fills forms, makes calls, books appointments and much more.",
  },
  {
    question: "Do I need to download an app?",
    answer: "No. Jarvis works 100% inside the WhatsApp already on your phone. You add the contact and start using it. That's it.",
  },
  {
    question: "How does it book appointments?",
    answer: "Jarvis uses autonomous browsing (Playwright) to access sites like ZocDoc, search for providers, filter by insurance and location, check availability and book. It uses your data from the vault automatically.",
  },
  {
    question: "Are the calls with a real voice?",
    answer: "Yes. The voice is natural and fluent. Jarvis calls, talks, collects information and sends you the result via WhatsApp message.",
  },
  {
    question: "Is my data secure?",
    answer: "Your documents are stored in an encrypted vault with Row Level Security on Supabase. Nobody except you and Jarvis has access. End-to-end encryption on all communication.",
  },
  {
    question: "What's the difference between plans?",
    answer: "Jarvis ($4.99) organizes your life: chat, calendar, reminders, vault and finances. Jarvis /Do ($14.99) executes for you: unlimited /do, autonomous bookings, flights, reservations. Full Jarvis ($24.99) is your executive assistant: voice calls, drafts in your tone, relationship CRM, proactive follow-ups, and traffic-aware reminders.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No contracts, no fees. Cancel whenever you want directly via WhatsApp. The first 30 days are free, no credit card required.",
  },
  {
    question: "Which calendars and banks integrate?",
    answer: "Calendars: Google Calendar, Apple Calendar, Outlook. Bidirectional sync — changes in your calendar appear in Jarvis, and vice versa.",
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
            Private beta — Real product
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Showcase conversations ──────────────────────────────────────────────────
const showcaseConversation = [
  { sender: "user", text: "Dermatologists that take Aetna near me" },
  { sender: "jarvis", text: "Found 3 dermatologists with Aetna near you:\n\n1. Dr. Marina Luz\n   0.5mi · \u2B50 4.8 · Mon-Fri\n\n2. Derma Plus Clinic\n   0.7mi · \u2B50 4.6 · Mon-Sat\n\n3. Dr. Paul Mendes\n   1.2mi · \u2B50 4.9 · Tue-Fri" },
  { sender: "user", text: "/do book with #3, next week, any morning slot" },
  { sender: "jarvis", text: "Booking with Dr. Paul Mendes. Pulling your data from vault..." },
  { sender: "jarvis", text: "\u2713 Booked!\nDr. Paul Mendes — Tue 9:30am\n253 Park Ave — Midtown\n\n\uD83D\uDCC5 Calendar updated\n\u2610 Bring recent lab results\n\u2610 Insurance card\n\nReminder 1h before with directions.", isSuccess: true },
];

const callConversation = [
  { sender: "user", text: "call Dr. Smith's office and book an appointment for next week in the morning" },
  { sender: "jarvis", text: "Calling the office now." },
  { sender: "jarvis", text: "\uD83D\uDCDE Call result\n\nAppointment booked. Tuesday 9am, Dr. Smith.\nFront desk asked to bring recent lab work.\n\nDuration: 2min 34s", isSuccess: true },
  { sender: "user", text: "perfect. add to calendar." },
  { sender: "jarvis", text: "Done. Reminder set 1h before." },
];

// ─── Phone mask (US format) ─────────────────────────────────────────────────
function phoneMask(value: string): string {
  let v = value.replace(/\D/g, "").slice(0, 10);
  if (v.length > 6) v = "(" + v.slice(0, 3) + ") " + v.slice(3, 6) + "-" + v.slice(6);
  else if (v.length > 3) v = "(" + v.slice(0, 3) + ") " + v.slice(3);
  else if (v.length > 0) v = "(" + v;
  return v;
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE (ENGLISH)
// ═════════════════════════════════════════════════════════════════════════════
const QUEUE_OFFSET = 247;
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

export default function DemoPageEn() {
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
    ? `${window.location.origin}/demo/en?ref=${refCode}`
    : "";

  const copyRefLink = () => {
    if (refLink) {
      navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareWhatsApp = () => {
    const text = `Have you heard of Jarvis? A WhatsApp assistant that calls, books and handles things for you. Sign up: ${refLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareTwitter = () => {
    const text = `Just joined the Jarvis waitlist — the first autonomous personal assistant on WhatsApp. It calls, books and handles everything for you. ${refLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSubmit = async () => {
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    const phoneRaw = phone.replace(/\D/g, "");
    if (phoneRaw.length !== 10) { setError("Phone must have 10 digits."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email."); return; }

    setLoading(true);
    try {
      const phoneNum = "1" + phoneRaw;
      const code = generateRefCode(name);
      const res = await fetch(`${BACKEND}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp_number: phoneNum,
          email: email.trim(),
          source: "fakedoor_en",
          referral_code: code,
          referred_by: referredBy.current || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok || res.status === 409) {
        setRefCode(data.referral_code || code);
        const pos = data.queue_position || (QUEUE_OFFSET + Math.floor(Math.random() * 30) + 1);
        setQueuePosition(pos);
        setDone(true);
      } else {
        setError(data.error || "Error signing up. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(250,248,245,0.85)] backdrop-blur-[60px] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex items-center justify-between h-16">
          <a href="/demo/en" className="flex flex-col">
            <span className="font-jetbrains font-bold text-xl tracking-[-0.04em] text-[var(--text-primary)] leading-none">jarvis</span>
            <span className="font-outfit text-[9px] tracking-[0.08em] text-[var(--text-secondary)] mt-0.5 leading-none">by <span className="font-medium">OL</span>pi Technologies</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#in-action" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">In action</a>
            <a href="#capabilities" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">Capabilities</a>
            <a href="#about" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">About</a>
            <a href="#plans" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">Plans</a>
            <a href="#faq" className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div className="flex items-center border border-[var(--border-subtle)] rounded-full overflow-hidden">
              <a href="/demo" className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[rgba(0,0,0,0.03)] text-[13px] font-outfit text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <svg width="18" height="13" viewBox="0 0 640 480" className="rounded-[2px]"><rect width="640" height="480" fill="#009b3a"/><polygon points="320,40 600,240 320,440 40,240" fill="#fedf00"/><circle cx="320" cy="240" r="100" fill="#002776"/><path d="M195,240 Q320,180 445,240" stroke="#fff" strokeWidth="12" fill="none"/></svg>
                PT
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(0,0,0,0.04)] text-[13px] font-outfit font-medium text-[var(--text-primary)]">
                <svg width="18" height="13" viewBox="0 0 640 480" className="rounded-[2px]"><rect width="640" height="480" fill="#fff"/><rect width="640" height="37" y="0" fill="#b22234"/><rect width="640" height="37" y="74" fill="#b22234"/><rect width="640" height="37" y="148" fill="#b22234"/><rect width="640" height="37" y="222" fill="#b22234"/><rect width="640" height="37" y="296" fill="#b22234"/><rect width="640" height="37" y="370" fill="#b22234"/><rect width="640" height="37" y="444" fill="#b22234"/><rect width="260" height="260" fill="#3c3b6e"/></svg>
                EN
              </span>
            </div>

            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-5 py-2 rounded-button border-2 border-[var(--border-button)] text-[var(--text-primary)] text-sm font-outfit font-medium hover:bg-[rgba(0,0,0,0.04)] transition-colors"
            >
              Get early access
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
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
          <motion.div variants={fadeBlurUp} className="flex flex-col gap-6 z-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(74,140,111,0.08)] border border-[rgba(74,140,111,0.15)] text-[13px] font-outfit text-[#4A8C6F]">
                <span className="w-2 h-2 rounded-full bg-[#4A8C6F] animate-pulse" />
                Private beta — limited spots
              </span>
            </div>

            <p className="font-outfit text-[13px] tracking-[0.15em] uppercase text-[var(--text-secondary)]">
              The first autonomous assistant on WhatsApp
            </p>

            <h1 className="font-outfit font-medium text-[clamp(44px,7vw,72px)] leading-[100%] tracking-[-0.03em] text-[var(--text-primary)]">
              You ask.
              <br />
              Jarvis{" "}
              <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-3 py-1 rounded-xl text-[var(--accent-highlight)]">
                /does.
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
              Books appointments, makes calls, reserves restaurants, searches flights,
              cancels services and organizes your life.
              All on WhatsApp. No downloads.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-button font-outfit font-medium transition-all duration-200 cursor-pointer bg-[var(--text-primary)] text-white hover:bg-[#2A2724] px-8 py-4 text-base"
              >
                Join the waitlist
                <ArrowRight size={18} />
              </button>
              <a
                href="#in-action"
                className="inline-flex items-center justify-center rounded-button font-outfit font-medium transition-all duration-200 cursor-pointer border-2 border-[var(--border-button)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(0,0,0,0.04)] px-8 py-4 text-base"
              >
                See it in action
              </a>
            </div>

            <p className="font-outfit text-[13px] text-[var(--text-secondary)]">
              Limited spots in beta. No credit card.
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

      {/* STATS BAR */}
      <section className="border-y border-[var(--border-subtle)] bg-white/40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8 flex flex-wrap justify-center gap-8 lg:gap-16">
          {[
            { value: "100%", label: "WhatsApp" },
            { value: "47s", label: "to book an appointment" },
            { value: "24/7", label: "available" },
            { value: "0", label: "apps to download" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-jetbrains font-bold text-2xl lg:text-3xl text-[var(--text-primary)]">{stat.value}</p>
              <p className="font-outfit text-[13px] text-[var(--text-secondary)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAIN — Before vs After */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeBlurUp}>
              <SectionLabel>The problem</SectionLabel>
              <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
                You spend more time
                <br />
                <span className="text-[var(--text-secondary)]">managing</span> your life
                <br />
                than <span className="text-[var(--text-secondary)]">living</span> it.
              </h2>
            </motion.div>

            <motion.p variants={fadeBlurUp} className="mt-6 font-outfit text-[clamp(16px,2vw,20px)] leading-[160%] text-[var(--text-body)] max-w-[480px]">
              Every simple task becomes a journey through 3 apps, 2 calls and 40 minutes.
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
                    <span className="font-outfit font-bold text-[10px] tracking-[0.15em] uppercase text-[rgba(26,23,20,0.35)]">Without Jarvis</span>
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
                    <span className="font-outfit font-bold text-[10px] tracking-[0.15em] uppercase text-[var(--success)]">With Jarvis</span>
                    <span className="font-jetbrains text-[12px] text-[var(--success)] font-bold">{p.timeWith}</span>
                  </div>
                  <p className="font-jetbrains font-bold text-[14px] text-[var(--text-primary)]">{p.with}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SHOWCASE — Full Conversation */}
      <section id="in-action" className="py-section" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig} className="mb-16 max-w-[600px]">
            <SectionLabel>In action</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,4vw,48px)] leading-[115%] tracking-[-0.02em] text-[var(--text-primary)]">
              One message.
              <br />
              Jarvis handles the rest.
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)]">
              Each request chains 5-8 steps automatically.{" "}
              <span className="font-jetbrains font-bold text-[var(--text-primary)]">All in a WhatsApp conversation</span>.
            </p>
          </motion.div>

          {/* Use case 1: Book appointment */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-24"
          >
            <motion.div variants={fadeBlurUp}>
              <span className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 block">Doctor appointment</span>
              <h3 className="font-outfit font-medium text-[clamp(22px,3vw,32px)] leading-[120%] text-[var(--text-primary)] mb-6">
                <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-2 py-1 rounded-lg text-[0.9em]">/do book with #3</span>
              </h3>

              <div className="flex flex-col gap-1 mb-6">
                {[
                  { step: "Search", desc: "You ask for dermatologists with your insurance near you" },
                  { step: "Recommend", desc: "Jarvis sends 3 options with distance and ratings" },
                  { step: "Choose", desc: 'You send "/do book with #3, next week morning"' },
                  { step: "Vault", desc: "Pulls your name, SSN, email, insurance from vault automatically" },
                  { step: "Book", desc: "Makes the appointment with your data" },
                  { step: "Confirm", desc: "Sends confirmation with address and checklist" },
                  { step: "Calendar", desc: "Google Calendar updated + reminder with directions" },
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

          {/* Use case 2: Phone call */}
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
              <span className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 block">Autonomous calling</span>
              <h3 className="font-outfit font-medium text-[clamp(22px,3vw,32px)] leading-[120%] text-[var(--text-primary)] mb-6">
                <span className="font-jetbrains font-bold bg-[rgba(65,62,62,0.06)] px-2 py-1 rounded-lg text-[0.9em]">/do call Dr. Smith</span>
              </h3>

              <p className="font-outfit text-[clamp(15px,2vw,18px)] leading-[160%] text-[var(--text-body)] mb-6">
                Jarvis picks up the phone, calls, talks to the receptionist, books and returns the result.
                You get the confirmation on WhatsApp.
              </p>

              <div className="flex flex-col gap-1 mb-6">
                {[
                  { step: "Call", desc: "Auto-dials the doctor's office" },
                  { step: "Talk", desc: "Interacts with the receptionist naturally" },
                  { step: "Book", desc: "Negotiates time and confirms" },
                  { step: "Return", desc: "Sends full result with transcript" },
                  { step: "Calendar", desc: "Updates automatically" },
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

      {/* EXECUTION — Remotion Animation */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <SectionLabel>Execution</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
              No assistant does this.
              <br />
              Literally.
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[130%] text-[var(--text-body)]">
              Siri suggests. Alexa answers. Google shows links.
              <br />
              Jarvis{" "}
              <span className="font-jetbrains font-bold text-[var(--text-primary)] bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">/does</span>.
            </p>
          </motion.div>

          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <RemotionPlayer component={ExecutionAnimation} durationInFrames={300} />
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section id="capabilities" className="py-section" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[1200px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-16">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              9 capabilities live.
              <br />
              <span className="text-[var(--text-secondary)]">And what&apos;s coming next.</span>
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

      {/* INTELLIGENCE — Remotion */}
      <section className="mx-auto max-w-[1200px] px-6 lg:px-10 py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <RemotionPlayer component={IntelligenceAnimation} durationInFrames={300} />
          </motion.div>

          <motion.div variants={fadeBlurUp} initial="initial" whileInView="animate" viewport={viewportConfig}>
            <SectionLabel>Intelligence</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
              The more you use it,
              <br />
              the more it knows.
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[160%] text-[var(--text-body)] max-w-[480px]">
              Jarvis learns your schedule, preferences, family and routine.
              Next time, it already knows what to do without asking.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Brain, title: "Memory", desc: "Knows you prefer morning appointments" },
                { icon: FileText, title: "Documents", desc: "Stores SSN, insurance in the vault" },
                { icon: Calendar, title: "Context", desc: "Knows you have a meeting Thu at 2pm" },
                { icon: Shield, title: "Secure", desc: "Row Level Security. Isolated data." },
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

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-section border-y border-[var(--border-subtle)]" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[1200px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-16">
            <SectionLabel>Process</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              It&apos;s that simple.
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

      {/* ABOUT US */}
      <section id="about" className="py-section">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[900px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-12">
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              The next generation of personal assistant.
              <br />
              <span className="text-[var(--text-secondary)]">On WhatsApp.</span>
            </h2>
          </motion.div>

          <motion.p variants={fadeBlurUp} className="font-outfit text-[clamp(16px,2vw,20px)] leading-[180%] text-[var(--text-body)] text-center max-w-[700px] mx-auto mb-12">
            Instead of building another app nobody will download, we built an assistant
            that lives where you already are. No downloads. No complex signups. No learning curve.
            You send a message like you would to any contact — and Jarvis executes.
          </motion.p>

          <motion.div variants={fadeBlurUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="font-outfit font-medium text-xl text-[var(--text-primary)] mb-3">How it works</h3>
              <div className="space-y-3">
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — You send text, voice, photo or PDF on WhatsApp. Like you would to any contact.
                </p>
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — Jarvis processes with multimodal AI, understands the context and executes the action: calls, books, searches, reserves, cancels.
                </p>
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — You get the confirmation. Without leaving WhatsApp.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-outfit font-medium text-xl text-[var(--text-primary)] mb-3">Our vision</h3>
              <div className="space-y-3">
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — We don&apos;t want to organize your life. We want to handle it. The difference between an assistant and an agent is that the agent acts.
                </p>
                <p className="font-outfit text-[15px] leading-[170%] text-[var(--text-body)]">
                  — Today Jarvis books, calls and reserves. Tomorrow it will negotiate your plans, pay your bills and anticipate what you need before you ask.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Statement quote */}
          <motion.div variants={fadeBlurUp} className="text-center py-8 border-t border-b border-[var(--border-subtle)]">
            <p className="font-outfit italic text-[clamp(20px,3.5vw,32px)] leading-[140%] tracking-[-0.01em] text-[var(--text-primary)] max-w-[700px] mx-auto">
              &ldquo;The future isn&apos;t a new app.
              <br />
              It&apos;s someone who handles your life
              <br />
              in a WhatsApp conversation.&rdquo;
            </p>
            <p className="font-outfit text-[13px] text-[var(--text-secondary)] mt-4">
              — OLpi Technologies
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* PRICING / LAUNCH */}
      <section id="plans" className="py-section" style={{ background: "linear-gradient(180deg, #F5F0EB 0%, #FAF8F5 100%)" }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mx-auto max-w-[1000px] px-6 lg:px-10"
        >
          <motion.div variants={fadeBlurUp} className="text-center mb-12">
            <SectionLabel>Launch</SectionLabel>
            <h2 className="mt-4 font-outfit font-medium text-[clamp(28px,5vw,48px)] leading-[110%] tracking-[-0.02em] text-[var(--text-primary)]">
              Early access.
              <br />
              <span className="text-[var(--accent-highlight)]">30 days free.</span>
            </h2>
            <p className="mt-4 font-outfit text-[clamp(16px,2vw,20px)] leading-[150%] text-[var(--text-body)] max-w-[500px] mx-auto">
              Sign up now and get 30 free days of the full Autopilot version.
              No credit card. No commitment.
            </p>
          </motion.div>

          {/* Plans */}
          <motion.div variants={fadeBlurUp} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1050px] mx-auto mb-12">
            {/* Essentials */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-7">
              <p className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-2">Jarvis</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-outfit font-medium text-[36px] tracking-[-0.02em] text-[var(--text-primary)]">$4</span>
                <span className="font-outfit text-[14px] text-[var(--text-secondary)]">.99/mo</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Smart scheduling with sync",
                  "Search near you",
                  "Financial tracking",
                  "Document vault",
                  "Lists and notes",
                  "3 /do per month",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--success)] mt-0.5 flex-shrink-0" />
                    <span className="font-outfit text-[13px] text-[var(--text-body)]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Autopilot */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-7">
              <p className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-2">Jarvis /Do</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-outfit font-medium text-[36px] tracking-[-0.02em] text-[var(--text-primary)]">$14</span>
                <span className="font-outfit text-[14px] text-[var(--text-secondary)]">.99/mo</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Everything in Jarvis +",
                  "Unlimited /do",
                  "Autonomous bookings",
                  "Restaurant reservations",
                  "Flight search & comparison",
                  "Service cancellations",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--success)] mt-0.5 flex-shrink-0" />
                    <span className="font-outfit text-[13px] text-[var(--text-body)]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Jarvis */}
            <div className="bg-[var(--text-primary)] border border-[var(--text-primary)] rounded-card p-7 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="font-outfit font-bold text-[9px] tracking-[0.15em] uppercase bg-[var(--accent-highlight)] text-white px-2.5 py-1 rounded-full">
                  30 days free
                </span>
              </div>
              <p className="font-outfit font-bold text-[11px] tracking-[0.2em] uppercase text-white/50 mb-2">Full Jarvis</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-outfit font-medium text-[36px] tracking-[-0.02em] text-white">$24</span>
                <span className="font-outfit text-[14px] text-white/50">.99/mo</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Everything in /Do +",
                  "Voice calls on your behalf",
                  "Drafts in your tone",
                  "Relationship CRM",
                  "Proactive follow-ups",
                  "Traffic-aware reminders",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--accent-highlight)] mt-0.5 flex-shrink-0" />
                    <span className="font-outfit text-[13px] text-white/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.p variants={fadeBlurUp} className="text-center font-outfit text-[12px] text-[var(--text-secondary)]/60 mb-8">
            * Prices may change before official launch.
          </motion.p>

          {/* Launch timeline */}
          <motion.div variants={fadeBlurUp} className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card px-8 py-5">
              <div className="text-center">
                <p className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--accent-highlight)] mb-1">Phase 1</p>
                <p className="font-outfit text-[14px] text-[var(--text-primary)] font-medium">Private beta</p>
                <p className="font-outfit text-[12px] text-[var(--text-secondary)]">First users</p>
              </div>
              <ChevronRight size={20} className="text-[var(--border-light)] hidden sm:block" />
              <div className="text-center">
                <p className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-1">Phase 2</p>
                <p className="font-outfit text-[14px] text-[var(--text-primary)] font-medium">Open beta</p>
                <p className="font-outfit text-[12px] text-[var(--text-secondary)]">Expanded invites</p>
              </div>
              <ChevronRight size={20} className="text-[var(--border-light)] hidden sm:block" />
              <div className="text-center">
                <p className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-1">Phase 3</p>
                <p className="font-outfit text-[14px] text-[var(--text-primary)] font-medium">Launch</p>
                <p className="font-outfit text-[12px] text-[var(--text-secondary)]">Public access</p>
              </div>
            </div>
            <p className="font-outfit text-[14px] text-[var(--text-body)] mt-6">
              We&apos;re starting the private beta.{" "}
              <span className="font-medium text-[var(--text-primary)]">Very soon.</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ (inline English) */}
      <section id="faq" className="mx-auto max-w-[800px] px-6 lg:px-10 py-section">
        <motion.div
          variants={fadeBlurUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mb-12"
        >
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 font-outfit font-medium text-[clamp(24px,4vw,44px)] leading-[120%] tracking-[-0.02em] text-[var(--text-primary)]">
            Frequently asked questions.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeBlurUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <Accordion.Root type="single" collapsible className="flex flex-col">
            {faqItemsEn.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="border-b border-[var(--border-light)]"
              >
                <Accordion.Trigger className="group flex items-center justify-between w-full py-5 text-left cursor-pointer">
                  <span className="font-outfit font-medium text-[15px] lg:text-base text-[var(--text-primary)] pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className="text-[var(--text-secondary)] shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <p className="pb-5 font-outfit text-[14px] lg:text-[15px] leading-[170%] text-[var(--text-body)]">
                    {item.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </section>

      {/* LEAD CAPTURE */}
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
              alt="Jarvis ready"
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
            Want to be one of the first?
          </motion.h2>

          <motion.p
            variants={fadeBlurUp}
            className="font-outfit text-[16px] leading-[160%] text-[var(--text-body)] mb-3 max-w-[420px] mx-auto"
          >
            Sign up and get <span className="font-medium text-[var(--text-primary)]">30 free days</span> of the full Autopilot version.
          </motion.p>
          <motion.p
            variants={fadeBlurUp}
            className="font-outfit text-[13px] text-[var(--text-secondary)] mb-10"
          >
            Limited spots. No credit card.
          </motion.p>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[var(--bg-card)] border border-[rgba(74,140,111,0.2)] rounded-card p-8"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}
            >
              <CheckCircle2 size={48} className="text-[var(--success)] mx-auto mb-4" />
              <h3 className="font-outfit font-medium text-2xl text-[var(--text-primary)] mb-2">You&apos;re on the list!</h3>

              {/* Queue position */}
              <div className="bg-[rgba(0,0,0,0.03)] rounded-xl px-6 py-4 mb-6">
                <p className="font-outfit text-[13px] text-[var(--text-secondary)] mb-1">Your position</p>
                <p className="font-jetbrains font-bold text-[36px] text-[var(--text-primary)] leading-none">#{queuePosition}</p>
              </div>

              {/* Referral CTA */}
              <div className="text-left mb-6">
                <h4 className="font-outfit font-medium text-[16px] text-[var(--text-primary)] mb-3 text-center">
                  Refer friends and move up the line
                </h4>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-3 bg-[rgba(74,140,111,0.05)] rounded-lg px-4 py-2.5 border border-[rgba(74,140,111,0.1)]">
                    <span className="font-jetbrains font-bold text-[14px] text-[var(--success)]">10</span>
                    <span className="font-outfit text-[13px] text-[var(--text-body)]">referrals → <span className="font-medium text-[var(--text-primary)]">3 months free</span></span>
                  </div>
                  <div className="flex items-center gap-3 bg-[rgba(255,92,0,0.05)] rounded-lg px-4 py-2.5 border border-[rgba(255,92,0,0.1)]">
                    <span className="font-jetbrains font-bold text-[14px] text-[var(--accent-highlight)]">20</span>
                    <span className="font-outfit text-[13px] text-[var(--text-body)]">referrals → <span className="font-medium text-[var(--text-primary)]">3 months free + 1 year at Essentials price</span></span>
                  </div>
                </div>

                {/* Referral link */}
                <div className="bg-[rgba(0,0,0,0.03)] rounded-xl p-3 mb-4">
                  <p className="font-outfit text-[11px] text-[var(--text-secondary)] uppercase tracking-wider mb-2">Your referral link</p>
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
                      {copied ? "Copied!" : "Copy"}
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
                We&apos;ll notify you on WhatsApp when your spot opens.
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
                  <label className="font-outfit text-[12px] text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(0,0,0,0.2)] outline-none focus:border-[var(--accent-highlight)]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-outfit text-[12px] text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 block">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(phoneMask(e.target.value))}
                    placeholder="(555) 123-4567"
                    className="w-full bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] rounded-xl px-4 py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(0,0,0,0.2)] outline-none focus:border-[var(--accent-highlight)]/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-outfit text-[12px] text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
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
                {loading ? "Signing up..." : (<>Claim my spot <ArrowRight size={18} /></>)}
              </button>

              <p className="font-outfit text-[12px] text-[var(--text-secondary)]/60 text-center mt-4">
                No commitment. No credit card. No spam.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border-subtle)] py-10" style={{ background: "linear-gradient(180deg, #FAF8F5 0%, #F0EBE5 100%)" }}>
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-jetbrains font-bold text-lg tracking-[-0.04em] text-[var(--text-primary)]/60">jarvis</span>
            <span className="font-outfit text-[10px] text-[var(--text-secondary)] mt-0.5">by OLpi Technologies</span>
          </div>
          <p className="font-outfit text-[13px] text-[var(--text-secondary)]">
            You ask. Jarvis{" "}
            <span className="font-jetbrains font-bold text-[var(--text-primary)]/60">/does</span>.
          </p>
          <div className="flex gap-6">
            <a href="/terms" className="font-outfit text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Terms</a>
            <a href="/privacy" className="font-outfit text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
