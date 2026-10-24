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
          950: '#030712', // Deep midnight navy shell
          900: '#070c1b', // Primary surfaces
          850: '#0c142b', // Card background
          800: '#111d3d', // Secondary surfaces / borders
          750: '#17254e', // Hover surfaces
          700: '#1e3063', // Elevated accents
          600: '#2d4383', // Muted borders
          500: '#64748b', // Blue-gray supporting text
          400: '#94a3b8', // Secondary text
          300: '#cbd5e1', // Primary text
          200: '#e2e8f0', // High-contrast text
          100: '#f8fafc', // Soft white headlines
        },
        holo: {
          cyan: '#00f2ff', // Electric cyan accent
          glow: 'rgba(0, 242, 255, 0.25)',
        },
        nasa: {
          blue: '#0b3d91',
          red: '#fc3d21',
          amber: '#f7cc7f',
        },
        gold: {
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
        cyan: {
          300: '#67e8f9',
          400: '#00f2ff',
          500: '#06b6d4',
          600: '#0891b2',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        crimson: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
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
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
