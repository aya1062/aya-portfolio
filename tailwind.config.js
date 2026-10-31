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
        brand: {
          bg: '#070D12',
          surface: '#101A20',
          'surface-elevated': '#16232B',
          blue: '#38BDF8',
          emerald: '#34D399',
          cyan: '#22D3EE',
          text: '#F4F8FA',
          muted: '#9BAFB9',
          border: '#263A43',
          'light-bg': '#F2F7F5',
          'light-text': '#102029',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Alexandria', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Alexandria', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-breathe': 'glowBreathe 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowBreathe: {
          '0%': { opacity: '0.4', transform: 'scale(0.98)' },
          '100%': { opacity: '0.8', transform: 'scale(1.03)' },
        }
      },
      backgroundImage: {
        'aurora-radial': 'radial-gradient(circle at center, rgba(34, 211, 238, 0.15) 0%, rgba(56, 189, 248, 0.1) 40%, rgba(52, 211, 153, 0.05) 70%, transparent 100%)',
        'aurora-conic': 'conic-gradient(from 180deg at 50% 50%, #38BDF8 0deg, #22D3EE 120deg, #34D399 240deg, #38BDF8 360deg)',
      }
    },
  },
  plugins: [],
}
