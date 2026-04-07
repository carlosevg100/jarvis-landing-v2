import type { Variants } from "framer-motion";

export const fadeBlurUp: Variants = {
  initial: { opacity: 0, y: 20, filter: "blur(3px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      opacity: { duration: 0.5, ease: "linear" },
      filter: { duration: 0.5, ease: "linear" },
      y: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "linear" },
  },
};

export const staggerContainer: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const staggerFast: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

export const fadeSimple: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const viewportConfig = { once: true, amount: 0.2 } as const;
