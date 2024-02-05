/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'main-pink': '#f7ede2',
        'main-yellow': '#f6bd60',
        'main-white': '#f7ede2',
        'main-green': '#84a59d', 
        'main-ppink': '#f28482',
        'main-ggreen': '#006d77'
      }
    },
  },
  plugins: [require("daisyui")],
}

