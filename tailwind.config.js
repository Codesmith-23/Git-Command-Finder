/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#000000',
          text: '#00ff00',
          border: '#00ff00',
        },
      },
    },
  },
  plugins: [],
}
