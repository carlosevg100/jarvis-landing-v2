type LogoProps = {
  size?: "sm" | "md" | "lg";
  showByline?: boolean;
};

const sizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

export default function Logo({ size = "md", showByline = true }: LogoProps) {
  return (
    <div className="flex flex-col">
      <span
        className={`font-jetbrains font-bold ${sizes[size]} tracking-[-0.04em] text-[var(--text-primary)] leading-none`}
      >
        jarvis
      </span>
      {showByline && (
        <span className="font-outfit text-[9px] tracking-[0.08em] text-[var(--text-secondary)] mt-0.5 leading-none">
          by <span className="font-medium">OL</span>pi Technologies
        </span>
      )}
    </div>
  );
}
