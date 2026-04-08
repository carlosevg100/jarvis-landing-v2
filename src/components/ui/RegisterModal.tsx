"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const BACKEND = "https://jarvis-backend-six.vercel.app";
const FALLBACK_WA = "https://wa.me/551150288221?text=Quero%20organizar%20minha%20vida";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `Quanto e ${a} + ${b}?`, answer: a + b };
}

function phoneMask(value: string): string {
  let v = value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
  else if (v.length > 2) v = "(" + v.slice(0, 2) + ") " + v.slice(2);
  else if (v.length > 0) v = "(" + v;
  return v;
}

export default function RegisterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [consent, setConsent] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"error" | "success" | "">("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const nameRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setName("");
    setPhone("");
    setEmail("");
    setCaptchaInput("");
    setConsent(false);
    setMsg("");
    setMsgType("");
    setLoading(false);
    setDone(false);
    setWhatsappUrl("");
    setCaptcha(generateCaptcha());
  }, []);

  useEffect(() => {
    if (open) {
      resetForm();
      document.body.style.overflow = "hidden";
      setTimeout(() => nameRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, resetForm]);

  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(phoneMask(e.target.value));
  };

  const handleSubmit = async () => {
    setMsg("");
    setMsgType("");

    if (!name.trim()) {
      setMsg("Por favor, informe seu nome.");
      setMsgType("error");
      return;
    }

    const phoneRaw = phone.replace(/\D/g, "");
    if (phoneRaw.length !== 11) {
      setMsg("WhatsApp deve ter 11 digitos — ex: (11) 99999-9999");
      setMsgType("error");
      return;
    }

    const captchaVal = parseInt(captchaInput, 10);
    if (isNaN(captchaVal) || captchaVal !== captcha.answer) {
      setMsg("Resposta incorreta. Tente novamente.");
      setMsgType("error");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    setLoading(true);

    try {
      const phoneNum = phoneRaw.startsWith("55") ? phoneRaw : "55" + phoneRaw;
      const res = await fetch(`${BACKEND}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp_number: phoneNum,
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const waUrl = data.whatsapp_url || FALLBACK_WA;
        setWhatsappUrl(waUrl);
        setDone(true);
        setTimeout(() => {
          window.location.href = waUrl;
        }, 1500);
      } else if (res.status === 409) {
        const waUrl = data.whatsapp_url || FALLBACK_WA;
        setWhatsappUrl(waUrl);
        setDone(true);
        setTimeout(() => {
          window.location.href = waUrl;
        }, 1500);
      } else {
        setMsg(data.error || "Erro ao criar conta. Tente novamente.");
        setMsgType("error");
        setLoading(false);
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
      }
    } catch {
      setMsg("Erro de conexao. Tente novamente.");
      setMsgType("error");
      setLoading(false);
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-[rgba(26,23,20,0.75)] animate-fadeIn"
      onClick={handleOverlay}
    >
      <div className="bg-[#FAF7F2] w-full sm:max-w-[420px] sm:rounded-[24px] rounded-t-[24px] p-8 relative">
        {/* Handle (mobile) */}
        <div className="w-10 h-1 rounded-full bg-[rgba(26,23,20,0.12)] mx-auto mb-4 sm:hidden" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[rgba(26,23,20,0.4)] hover:text-[rgba(26,23,20,0.8)] text-xl"
        >
          &times;
        </button>

        <p className="font-outfit text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-1">
          Ativar agora
        </p>
        <h3 className="font-outfit font-medium text-[28px] text-[var(--text-primary)] mb-2">
          Comecar gratis
        </h3>
        <p className="font-outfit text-[14px] text-[var(--text-body)] mb-6 leading-[160%]">
          7 dias gratis, sem cartao. Cancele quando quiser.
        </p>

        {done ? (
          <div className="py-8 text-center">
            <p className="font-outfit font-medium text-[28px] text-[var(--text-primary)] mb-2">
              Abrindo WhatsApp...
            </p>
            <p className="font-outfit text-[13px] text-[var(--text-secondary)] mb-6 leading-[170%]">
              Envie a mensagem pronta para ativar o Jarvis.<br />
              Se nao abriu automaticamente, clique abaixo.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full text-white text-[14px] font-semibold no-underline"
              style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,.3)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Abrir WhatsApp e comecar
            </a>
            <p className="font-outfit text-[11px] text-[var(--text-secondary)] mt-4">
              A mensagem ja esta pronta — e so apertar enviar.
            </p>
          </div>
        ) : (
          <>
            {/* Name */}
            <div className="mb-4">
              <input
                ref={nameRef}
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full border-b border-[rgba(26,23,20,0.15)] bg-transparent py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(26,23,20,0.3)] outline-none focus:border-[rgba(26,23,20,0.4)] transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <input
                type="tel"
                placeholder="WhatsApp — (11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                autoComplete="tel"
                className="w-full border-b border-[rgba(26,23,20,0.15)] bg-transparent py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(26,23,20,0.3)] outline-none focus:border-[rgba(26,23,20,0.4)] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email (para recuperacao de conta)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full border-b border-[rgba(26,23,20,0.15)] bg-transparent py-3 font-outfit text-[15px] text-[var(--text-primary)] placeholder:text-[rgba(26,23,20,0.3)] outline-none focus:border-[rgba(26,23,20,0.4)] transition-colors"
              />
            </div>

            {/* Captcha */}
            <div className="flex items-center gap-3 py-3 border-b border-[rgba(26,23,20,0.15)] mb-4">
              <span className="font-outfit text-[13px] text-[var(--text-body)] flex-1">
                {captcha.question}
              </span>
              <input
                type="number"
                placeholder="?"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                autoComplete="off"
                min="1"
                max="20"
                className="w-[60px] border-b border-[rgba(26,23,20,0.2)] bg-transparent py-1 text-center font-outfit text-[14px] text-[var(--text-primary)] outline-none focus:border-[rgba(26,23,20,0.4)]"
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-2 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 min-w-[16px] accent-[var(--accent-highlight)]"
              />
              <span className="font-outfit text-[11px] text-[rgba(26,23,20,0.55)] leading-[1.5]">
                Li e concordo com os{" "}
                <a
                  href="/termos"
                  target="_blank"
                  className="text-[var(--accent-highlight)] underline"
                >
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a
                  href="/privacidade"
                  target="_blank"
                  className="text-[var(--accent-highlight)] underline"
                >
                  Politica de Privacidade
                </a>
                . Entendo que esta e uma ferramenta de apoio a organizacao pessoal, pode apresentar
                erros, e nao substitui agendas profissionais. Nao nos responsabilizamos por
                compromissos perdidos ou informacoes incorretas.
              </span>
            </label>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!consent || loading}
              className="w-full flex items-center justify-between px-6 py-4 bg-[var(--text-primary)] text-white font-outfit text-[13px] tracking-[0.1em] uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2724] transition-colors"
            >
              <span>{loading ? "Aguarde..." : "Criar minha conta"}</span>
              <span>&rarr;</span>
            </button>

            <p className="font-outfit text-[12px] text-[var(--text-secondary)] text-center mt-3">
              Sem compromisso. Cancele quando quiser.
            </p>

            {/* Error message */}
            {msg && (
              <p
                className={`font-outfit text-[13px] text-center mt-3 ${
                  msgType === "error" ? "text-red-600" : "text-[var(--success)]"
                }`}
              >
                {msg}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
