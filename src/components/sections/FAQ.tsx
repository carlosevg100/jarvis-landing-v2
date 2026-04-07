"use client";

import { motion } from "framer-motion";
import { fadeBlurUp, viewportConfig } from "@/lib/animations";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { faqItems } from "@/lib/faq-data";

export default function FAQ() {
  return (
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
          Perguntas frequentes.
        </h2>
      </motion.div>

      <motion.div
        variants={fadeBlurUp}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        <Accordion.Root type="single" collapsible className="flex flex-col">
          {faqItems.map((item, i) => (
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
  );
}
