import { type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-4 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants = {
  outline:
    "border-2 border-[var(--border-button)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(0,0,0,0.04)]",
  ghost:
    "border-0 bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
};

export default function Button({
  children,
  href,
  variant = "outline",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-button font-outfit font-medium transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
