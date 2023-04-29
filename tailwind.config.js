/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screen: {
      'sm': '360px',
      'md': '640px',
      'lg': '768px',
      'xl': '1028px'
    },
    container: {
      center: true,
      padding: '2rem'
    }
  },
  plugins: [],
}

