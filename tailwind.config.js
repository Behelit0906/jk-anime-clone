/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue:{
          50: '#35A9E2',
          100:'#1C92CB',
          150: '#146E9A'
        },
        gray: {
          50: '#F7F7F7',
          100: '#DEDEDE'
        },
        myOrange: {
          50: '#ff9d00'
        }
      },
      screens: {
        lg: '994px',
        xl: '1200px'
      },
      fontFamily: {
        mulish: ['"Mulish", sans-serif'],
        oswald: ['"Oswald", sans-serif']
      }
    },
  },
  plugins: [],
}