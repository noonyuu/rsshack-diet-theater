/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        subwhite: "#F7F7F7",
      },
    },
    fontFamily: {
      meiryo: ["メイリオ"],
      nikomoji: ["nikomoji-plus-v2"],
    },
  },
};
