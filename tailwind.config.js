/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      
      backgroundColor: {
        'main-100': '#2196f3',
        'main-200': '#0D47A1',
        'main-300': '#1190CB',
        'main-400': '#8FD6E1',
        'green-100': '#A6EC99',
        'overlay-30': 'rgba(0,0,0,0.3)',
      },
      colors: {
        'main-100': '#2196f3',
        'main-200': '#0D47A1',
        'main-300': '#1190CB',
        'main-400': '#8FD6E1',
        'green-100': '#A6EC99',
      },
      width: {
        '850': '850px',
       },
    },
  },
  plugins: [],
}