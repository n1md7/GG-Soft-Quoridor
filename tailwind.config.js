/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './*.html', './styles/*.?css'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Kanit', 'sans-serif'],
        bebas: ['Bebas', 'Kanit'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        // Custom colors - accessible as text-app-cyan, bg-app-cyan, etc.
        app: {
          cyan: '#00E0EA',
          lightblue: '#B5F2EE',
          orange: '#FF7930',
          peach: '#F9F1E0',
          gray400: '#494949',
          gray300: '#787878',
          gray200: '#E2E2E2',
          gray100: '#F3F6F6',
        },
        ...defaultTheme.colors, // Ensures default colors are imported
      },
      keyframes: {
        // custom animation
        pump: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0' },
          '80%': { transform: 'scale(1.2)', opacity: '100' },
        },
      },
      animation: {
        pump: 'pump 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
