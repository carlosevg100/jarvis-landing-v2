"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { label: "Execução", href: "#execucao" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Inteligência", href: "#inteligencia" },
  { label: "Planos", href: "#planos" },
];

export default function Nav() {
  const scrolled = useScrolled(10);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FFFFFFEB] backdrop-blur-[60px] border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#">
            <Logo size="sm" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-outfit text-sm text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#planos"
            className="hidden md:inline-flex items-center px-6 py-2.5 rounded-button border-2 border-[var(--border-button)] text-[var(--text-primary)] text-sm font-medium hover:bg-[rgba(0,0,0,0.04)] transition-colors"
          >
            Começar
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--text-primary)]"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]"
          >
            <div className="pt-24 px-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-outfit text-2xl text-[var(--text-primary)] font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#planos"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-8 py-4 rounded-button border-2 border-[var(--border-button)] text-[var(--text-primary)] text-base font-medium"
              >
                Começar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
