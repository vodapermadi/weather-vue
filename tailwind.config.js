/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation : {
        'spin-slow' : 'spin 0.1s linear infinite',
      }
    },
  },
  plugins: [],
}