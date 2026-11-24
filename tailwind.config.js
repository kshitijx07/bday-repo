/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: { DEFAULT: '#315C4C', light: '#3d7360', dark: '#264a3c' },
        blush: { DEFAULT: '#F2A7B5', light: '#f7c4ce', dark: '#e88a9c' },
        ivory: { DEFAULT: '#FFF7E8', dark: '#f5ecd8', deep: '#ebe0cc' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      keyframes: {
        beat: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.22)' } },
        rise: { '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' }, '15%': { opacity: '.8' }, '100%': { transform: 'translateY(-100vh) rotate(45deg)', opacity: '0' } },
        float: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '33%': { transform: 'translateY(-8px) rotate(3deg)' }, '66%': { transform: 'translateY(4px) rotate(-2deg)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        sparkle: { '0%,100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' }, '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' } },
        glow: { '0%,100%': { boxShadow: '0 0 20px rgba(242,167,181,.3)' }, '50%': { boxShadow: '0 0 40px rgba(242,167,181,.6), 0 0 80px rgba(242,167,181,.2)' } },
        'petal-fall': { '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' }, '10%': { opacity: '1' }, '90%': { opacity: '.6' }, '100%': { transform: 'translateY(110vh) translateX(80px) rotate(360deg)', opacity: '0' } },
        'letter-write': { '0%': { width: '0%' }, '100%': { width: '100%' } },
      },
      animation: {
        beat: 'beat 2s ease-in-out infinite',
        rise: 'rise 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        sparkle: 'sparkle 2.5s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        'petal-fall': 'petal-fall 10s linear infinite',
      },
    },
  },
  plugins: [],
};
