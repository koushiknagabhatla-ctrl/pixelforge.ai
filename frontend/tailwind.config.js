/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.06)",
        input: "rgba(255, 255, 255, 0.04)",
        ring: "rgba(255, 255, 255, 0.1)",
        background: "#09090b",
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#fafafa",
          foreground: "#09090b",
        },
        secondary: {
          DEFAULT: "rgba(255, 255, 255, 0.04)",
          foreground: "#fafafa",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          foreground: "#fafafa",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.02)",
          foreground: "#fafafa",
        },
        popover: {
          DEFAULT: "rgba(15, 15, 17, 0.96)",
          foreground: "#fafafa",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
        headline: ['"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "spin-slow": "spin 20s linear infinite",
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
