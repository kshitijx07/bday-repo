/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Aesthetic Palette: Warm Ivory, Forest Green, Blush Pink
        ivory: {
          DEFAULT: '#FFF7E8',
          light: '#FFFDF9',
          dark: '#F4E8D0',
          card: '#FAF2E4',
          border: 'rgba(49, 92, 76, 0.15)',
        },
        forest: {
          DEFAULT: '#315C4C',
          deep: '#204034',
          darker: '#162E25',
          muted: '#4C7A68',
          light: '#6F9D8B',
          faint: 'rgba(49, 92, 76, 0.12)',
        },
        blush: {
          DEFAULT: '#F2A7B5',
          light: '#FCE6EB',
          deep: '#E28698',
          dark: '#CE687D',
          glow: 'rgba(242, 167, 181, 0.45)',
          faint: 'rgba(242, 167, 181, 0.18)',
        },
        // Mapped Aliases for backward compatibility
        charcoal: {
          DEFAULT: '#FFF7E8',
          deep: '#FAF2E4',
          darker: '#162E25',
          card: '#FFFDF9',
          border: 'rgba(49, 92, 76, 0.14)',
        },
        silver: {
          DEFAULT: '#315C4C',
          dim: '#527A6C',
          light: '#204034',
          faint: 'rgba(49, 92, 76, 0.14)',
        },
        signal: {
          DEFAULT: '#F2A7B5',
          glow: 'rgba(242, 167, 181, 0.45)',
          deep: '#E28698',
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
