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
          950: '#020205',
          900: '#060810',
          850: '#0B0E1A',
          800: '#111424',
          750: '#171B30',
          700: '#1F243E',
          600: '#2A3152',
          500: '#475569',
        },
        holo: {
          cyan: '#00f2ff',
          glow: 'rgba(0, 242, 255, 0.4)',
        },
        nasa: {
          blue: '#0b3d91',
          red: '#fc3d21',
          amber: '#f7cc7f',
        },
        gold: {
          400: '#F6C358',
          500: '#E5A93C',
          600: '#C88B27',
          700: '#A46E1B',
        },
        cyan: {
          400: '#00f2ff',
          500: '#0ea5e9',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
