/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracota: {
          DEFAULT: '#B2633C',
          light: '#C88763',
          dark: '#8F4E2F',
        },
        oliva: {
          DEFAULT: '#6B795F',
          light: '#8A9680',
          dark: '#525D49',
        },
        chumbo: {
          DEFAULT: '#616A71',
          light: '#879096',
          dark: '#454C51',
        },
        marfim: '#FBFAF8',
      },
      fontFamily: {
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
