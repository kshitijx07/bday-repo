/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#2A2A2A',
          deep: '#1E1E1E',
          darker: '#141414',
          card: '#242424',
          border: 'rgba(192,192,192,0.15)',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          dim: '#858585',
          light: '#E6E6E6',
          faint: 'rgba(192,192,192,0.15)',
        },
        signal: {
          DEFAULT: '#E10600',
          glow: 'rgba(225,6,0,0.35)',
          deep: '#B80500',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      keyframes: {
        beat: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.2)' } },
        rise: { '0%': { transform: 'translateY(0)', opacity: '0' }, '15%': { opacity: '.7' }, '100%': { transform: 'translateY(-100vh)', opacity: '0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        beat: 'beat 2.2s ease-in-out infinite',
        rise: 'rise 12s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
