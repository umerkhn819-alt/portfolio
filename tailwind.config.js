/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          raised: "rgb(var(--color-surface-raised) / <alpha-value>)",
          overlay: "rgb(var(--color-surface-overlay) / <alpha-value>)",
        },
        platinum: {
          100: "#F5F5F4",
          300: "#D6D6D2",
          500: "#8A8A86",
          700: "#3A3A38",
          900: "#0E0E0D",
        },
        accent: {
          DEFAULT: "#F5F5F4",
          muted: "#D6D6D2",
          glow: "#F5F5F4",
        },
        border: {
          subtle: "rgba(var(--color-border-subtle) / <alpha-value>)",
          DEFAULT: "rgba(var(--color-border) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};
