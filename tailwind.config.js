/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "input-shadow": "0 1px 15px 1px rgba(0, 0, 0, 0.1)",
        "header-shadow": "0 2px 8px 0px rgba(0, 0, 0, 0.1)",
      },

      fontFamily: {
        "plus-jakarta-sans": ['"Plus Jakarta Sans"', "sans-serif"],
      },
      letterSpacing: {
        widest: ".3em",
      },
      dropShadow: {
        glow: "0 0 1em hsl(26, 100%, 55%)",
      },
    },
  },

  plugins: [],
};
