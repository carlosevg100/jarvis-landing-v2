"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
  const [captchaInput, setCaptchaInput] = useState("");
  const [consent, setConsent] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"error" | "success" | "">("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const nameRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setName("");
    setPhone("");
    setCaptchaInput("");
    setConsent(false);
    setMsg("");
    setMsgType("");
    setLoading(false);
    setDone(false);
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
      const res = await fetch(
        "https://jarvis-backend-six.vercel.app/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), whatsapp_number: phoneNum }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setDone(true);
        if (data.whatsapp_url) {
          setTimeout(() => {
            window.open(data.whatsapp_url, "_blank");
          }, 1500);
        }
      } else if (res.status === 409) {
        setDone(true);
        if (data.whatsapp_url) {
          setTimeout(() => {
            window.open(data.whatsapp_url, "_blank");
          }, 1500);
        }
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
          7 dias gratis, sem cartao. Voce recebe uma mensagem no WhatsApp em segundos.
        </p>

        {done ? (
          <div className="py-8 text-center">
            <p className="font-outfit font-medium text-[28px] text-[var(--text-primary)] mb-2">
              Pronto.
            </p>
            <p className="font-outfit text-[13px] text-[var(--text-secondary)]">
              Verifique o WhatsApp em instantes.
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

            {/* Hint */}
            <p className="font-outfit text-[12px] text-[var(--text-secondary)] mb-4 leading-[160%]">
              Verifique seu numero antes de continuar. Enviamos a primeira mensagem em instantes.
            </p>

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

            {/* Error/Success message */}
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
