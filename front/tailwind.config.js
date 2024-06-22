/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#59A5B1",
      },
    },
    fontFamily: {
      meiryo: ["メイリオ"],
      nikomoji: ["nikomoji-plus-v2"],
    },
  },
};
