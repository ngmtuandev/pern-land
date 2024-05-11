/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "yellow-bold-main": "#FFBA00",
        "ogrin-700": "#E56700"
      },
      colors: {
        "yellow-bold-main": "#FFBA00",
        "ogrin-700": "#E56700"
      },
      width: {
        main: "1200px",
      }
    },
  },
  plugins: [],
}

