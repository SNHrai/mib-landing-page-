/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a0a0a',
          gray: '#1a1a1a',
          accent: '#e8d5b7',
          gold: '#c9a96e',
        },
      },
    },
  },
  plugins: [],
}

