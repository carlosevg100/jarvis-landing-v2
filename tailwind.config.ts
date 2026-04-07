import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        jetbrains: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        neo: {
          frost: "#F8F8F8",
          grey: "#413E3E",
          "gamma-grey": "#4F4749",
          "medium-grey": "#8E8C84",
          "medium-dark-grey": "#6F6F67",
          "light-grey": "#DEDCD8",
          highlight: "#FF5C00",
          success: "#4A8C6F",
        },
      },
      backdropBlur: {
        nav: "60px",
      },
      borderRadius: {
        card: "24px",
        "card-lg": "32px",
        button: "100px",
      },
      keyframes: {
        slideDown: {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        slideDown: "slideDown 0.3s cubic-bezier(0.62, 0.05, 0.01, 0.99)",
        slideUp: "slideUp 0.3s cubic-bezier(0.62, 0.05, 0.01, 0.99)",
      },
      spacing: {
        section: "clamp(80px, 10vw, 160px)",
      },
    },
  },
  plugins: [],
};
export default config;
