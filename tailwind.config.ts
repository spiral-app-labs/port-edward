import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4f8",
          100: "#d9e4ef",
          200: "#b3c9de",
          300: "#8daece",
          400: "#6793bd",
          500: "#4178ac",
          600: "#2d5a8a",
          700: "#1e3d67",
          800: "#0f2044",
          900: "#080f22",
          950: "#040811",
        },
        gold: {
          50: "#fdf9ed",
          100: "#faf0cc",
          200: "#f5de91",
          300: "#f0cb56",
          400: "#e8b42d",
          500: "#c99520",
          600: "#a87318",
          700: "#875414",
          800: "#653c12",
          900: "#432610",
        },
        cream: {
          50: "#fefdfb",
          100: "#fdf9f0",
          200: "#f9f0da",
          300: "#f3e4ba",
          400: "#ead196",
          500: "#ddb96a",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
