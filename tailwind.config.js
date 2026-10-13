/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#050608',
          900: '#08090C',
          850: '#0C0E14',
          800: '#11141D',
          750: '#161A26',
          700: '#1C2130',
          600: '#282F44',
          500: '#475569',
        },
        gold: {
          400: '#F6C358',
          500: '#E5A93C',
          600: '#C88B27',
          700: '#A46E1B',
        },
        cyan: {
          400: '#38BDF8',
          500: '#0EA5E9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}
