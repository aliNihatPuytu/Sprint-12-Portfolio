/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#4731d3',
          lime: '#cbf281',
          darkbg: '#171043',
          darkpanel: '#252128',
          darkolive: '#1a210b',
        }
      },
      boxShadow: { soft: '0 10px 25px rgba(0,0,0,0.15)' },
      borderRadius: { xl2: '1.25rem' }
    },
  },
  plugins: [],
}
