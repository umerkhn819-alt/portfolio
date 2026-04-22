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
        accent: {
          DEFAULT: "#6366f1",
          muted: "#818cf8",
          glow: "#a5b4fc",
        },
        border: {
          subtle: "rgba(var(--color-border-subtle) / <alpha-value>)",
          DEFAULT: "rgba(var(--color-border) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "Rajdhani",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Orbitron", "system-ui", "sans-serif"],
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
