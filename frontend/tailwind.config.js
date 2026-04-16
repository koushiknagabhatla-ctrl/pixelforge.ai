/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.08)",
        input: "rgba(255, 255, 255, 0.05)",
        ring: "rgba(255, 255, 255, 0.2)",
        background: "#010201",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#010201",
        },
        secondary: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.02)",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "rgba(10, 10, 12, 0.96)",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        headline: ['"Clash Display"', "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "spin-slow": "spin 8s linear infinite",
        "star-btn": "star-btn calc(var(--duration)*1s) linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
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
