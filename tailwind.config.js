/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-custom": "#409969",
        "red-custom": {
          DEFAULT: "#FF472F",
          dark: "#F61D00",
        },
        "black-custom": "#191B41",
      },
      fontFamily: {
        righteous: ["Righteous", "cursive"],
      },
    },
  },
  plugins: [],
};
