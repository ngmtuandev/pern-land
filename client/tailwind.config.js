/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      agbalumo: ["Agbalumo"]
    },
    extend: {
      backgroundColor: {
        "yellow-bold-main": "#FFBA00",
        "ogrin-700": "#E56700",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-50": "rgba(0,0,0,0.5)"
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

