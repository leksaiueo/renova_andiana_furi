/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/index.css"],
  theme: {
    extend: {
      colors: {
        "soft-pink": "#FFB7B2",
        "soft-light": "#FFDAC1",
        "soft-cream": "#FFF5F5",
        "soft-lavender": "#E2F0CB",
        "soft-text": "#4A4A4A",
        "soft-accent": "#FF9AA2",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
