"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rotatingHooks } from "@/lib/hooks-data";

export default function RotatingHooks() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingHooks.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const hook = rotatingHooks[index];
  const isFaz = hook.isFaz !== false;

  return (
    <div className="min-h-[4.5em] relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="font-outfit text-[clamp(16px,2vw,20px)] leading-[150%]"
        >
          {isFaz ? (
            <>
              <span className="font-jetbrains font-bold text-[var(--text-primary)] bg-[rgba(65,62,62,0.07)] px-2 py-0.5 rounded-md">
                {hook.faz}
              </span>{" "}
              <span className="text-[var(--text-body)]">{hook.context}</span>
            </>
          ) : (
            <>
              <span className="text-[var(--text-primary)]">
                &ldquo;{hook.faz}&rdquo;
              </span>{" "}
              <span className="text-[var(--text-secondary)]">{hook.context}</span>
            </>
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
