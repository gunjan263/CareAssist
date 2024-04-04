/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Oleo: ["Oleo Script", "system-ui"],
        Petit: ["Petit Formal Script", "cursive"],
        Playfair: ["Playfair Display", "serif"],
        EB: ["EB Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
