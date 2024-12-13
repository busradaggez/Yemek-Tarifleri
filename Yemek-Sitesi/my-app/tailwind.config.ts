import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./page/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      backgroundImage: {
        background1: "url('/background1.jpg')",
        background2: "url('/background2.png')",
      },
      fontFamily: {
        sans: ["Agu Display", "sans-serif"],
      },
      colors: {
        orange: "#FFA500",
        orange2: "#FF4500",
        white: "#FFF",
        gray: "#696969",
        gray2: "D3D3D3",
        black: "#000",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".custom-input": {
          width: "100%",
          padding: "0.5rem 1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.375rem",
          outline: "none",
          transition: "box-shadow 0.2s",
          "&:focus": {
            boxShadow: "0 0 0 2px #FFA500",
          },
        },
      });
    }),
  ],
};