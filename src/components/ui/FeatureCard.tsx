"use client";

import { motion } from "framer-motion";
import { fadeBlurUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeBlurUp}
      className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-card p-8 backdrop-blur-sm"
    >
      <Icon size={24} strokeWidth={1.5} className="text-[var(--text-primary)] mb-5" />
      <h3 className="font-outfit font-medium text-lg text-[var(--text-primary)] mb-3">
        {title}
      </h3>
      <p className="font-outfit text-[15px] leading-[160%] text-[var(--text-body)]">
        {description}
      </p>
    </motion.div>
  );
}
