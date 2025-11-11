/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TOG Waarde 2025 color palette
        primary: '#E85D42',        // Vibrant Warm Terracotta
        'primary-hover': '#D14A2F',
        'primary-active': '#B93D24',
        background: '#FFF9F0',      // Warm Cream
        secondary: '#B4C4AE',       // Soft Sage
        'secondary-dark': '#8A9D84', // Darker Sage for better contrast
        accent: '#FF6B4A',          // Vibrant Coral
        border: '#E8D9C5',          // Warm Sand
        'text-primary': '#333333',
        'text-secondary': '#666666'
      },
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
        display: ['Funnel Sans', 'sans-serif'],
        body: ['Lexend Deca', 'sans-serif']
      },
      animation: {
        'in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}