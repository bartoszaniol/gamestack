/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "prim-blue": "#0B1AA9F5",
        "sec-blue": "#2F1579D9",
      },
    },
  },
  plugins: [],
};

module.exports = config;
