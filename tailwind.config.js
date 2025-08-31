/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        space: '#0A0F1F',
        neon: '#00F5FF',
        violet: '#8B00FF',
        magenta: '#DA00FF',
        'custom-light': '#F5F5F5',
        'custom-teal': '#307D7E',
        'custom-cyan': '#F0FFFF',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,245,255,0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}