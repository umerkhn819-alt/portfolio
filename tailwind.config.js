/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#050505", // Slightly softer black
          light: "#EFEFEF",
          card: "rgba(255, 255, 255, 0.03)",
        },
        accent: {
          DEFAULT: "#85EE00", // lime green
          hover: "#9BFF1A",
          glow: "rgba(133, 238, 0, 0.5)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A3A3A3",
          inverse: "#050505",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          inverse: "rgba(0, 0, 0, 0.08)",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Sulphur Point", "sans-serif"],
      },
      backgroundImage: {
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
};
