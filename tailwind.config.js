/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'Sans-serif'],
      },
      colors: {
        'primary-yellow': '#eca539',
        'dark-red': '#c00e20',
        'primary-red': '#f22539',
        'primary-black': '#353535',
        'dark-grey': '#5e5e5e',
        'primary-grey': '#bfbfbf',
        'secondary-grey': '#e8e8e8',
        'primary-white': '#f5f5f5',
        'secondary-white': '#f9f9f9',
      },
    },
  },
  plugins: [],
}
