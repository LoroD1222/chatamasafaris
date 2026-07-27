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
          ink: "#403028",
          bark: "#403028",
          moss: "#403028",
          leaf: "#E0B880",
          sand: "#FFF8F0",
          cream: "#FFF8F0",
          gold: "#E0B880",
          sky: "#FFF8F0"
        },
        astra: {
          cream: "#FFF8F0",
          amber: "var(--astra-primary-amber)",
          gold: "#E0B880",
          cocoa: "#403028",
          brown: "#403028",
          dark: "#403028"
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
        soft: "0 24px 70px rgba(64, 48, 40, 0.14)",
        lift: "0 18px 45px rgba(64, 48, 40, 0.22)"
      }
    }
  },
  plugins: [animate]
};

export default config;
