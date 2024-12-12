import type { Config } from "tailwindcss";

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
      fontFamily: {
        sans: ["Agu Display", "sans-serif"],
      },
      colors: {
        orange: "#FFA500",
        red: "#FF0000",
        white: "#FFF",
        gray: "#696969",
      },
    },
  },
  plugins: [],
} satisfies Config;
