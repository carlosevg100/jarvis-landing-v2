"use client";

import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

const productLinks = [
  { label: "Funcionalidades", href: "#execucao" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

const legalLinks = [
  { label: "Termos de Uso", href: "/termos" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Contato", href: "mailto:suporte@jarvis-br.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Logo size="md" />
            <p className="font-outfit text-sm text-[var(--text-secondary)]">
              Assistente Pessoal Autonomo no WhatsApp
            </p>
            <Button href="#planos" size="sm">
              Teste gratis por 7 dias
            </Button>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4">
              Produto
            </h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-outfit font-bold text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
          <p className="font-outfit text-[12px] text-[var(--text-secondary)]">
            &copy; 2026 Olpi Technologies. Sao Paulo, Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
}
