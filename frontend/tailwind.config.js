/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(99, 102, 241, 0.08)",
        input: "rgba(99, 102, 241, 0.06)",
        ring: "rgba(99, 102, 241, 0.2)",
        background: "#0a0a0f",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "rgba(99, 102, 241, 0.05)",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "rgba(99, 102, 241, 0.03)",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "rgba(99, 102, 241, 0.08)",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "rgba(15, 15, 25, 0.6)",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "rgba(20, 20, 31, 0.95)",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        headline: ["Manrope", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "spin-slow": "spin 20s linear infinite",
        "star-btn": "star-btn calc(var(--duration)*1s) linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "star-btn": {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
