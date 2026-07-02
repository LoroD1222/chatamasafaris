import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        safari: {
          ink: "#1C1612",
          bark: "#1C1612",
          moss: "#1C1612",
          leaf: "#E07B39",
          sand: "#F0E9DE",
          cream: "#F0E9DE",
          gold: "#E07B39",
          sky: "#F0E9DE"
        },
        astra: {
          cream: "#F0E9DE",
          amber: "var(--astra-primary-amber)",
          gold: "#E07B39",
          cocoa: "#1C1612",
          brown: "#1C1612",
          dark: "#1C1612"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["Satoshi", "Arial", "sans-serif"],
        inter: ["Satoshi", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(28, 22, 18, 0.14)",
        lift: "0 18px 45px rgba(28, 22, 18, 0.22)"
      }
    }
  },
  plugins: [animate]
};

export default config;
