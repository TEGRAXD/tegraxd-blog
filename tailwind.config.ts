import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        midnight: '#0D1117',
      },
      typography: {
        
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
