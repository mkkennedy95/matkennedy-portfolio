import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1b2a4a",
          50: "#f0f3f9",
          100: "#d9e1ef",
          200: "#b3c3df",
          300: "#8da4cf",
          400: "#6786bf",
          500: "#4168af",
          600: "#34538c",
          700: "#273e69",
          800: "#1b2a4a",
          900: "#0e1525",
        },
      },
    },
  },
  plugins: [],
};

export default config;
