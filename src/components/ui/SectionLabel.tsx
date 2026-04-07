export default function SectionLabel({ children }: { children: string }) {
  return (
    <span className="font-outfit font-bold text-[11px] leading-[140%] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
      {children}
    </span>
  );
}
