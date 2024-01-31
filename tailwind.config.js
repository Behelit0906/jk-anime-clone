/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
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
        },
        dark: {
          50: '#777EA7',
          100: '#474c67',
          150: '#303240',
          200: '#212529'
        }
      },
      screens: {
        'cl-1': '480px',
        'cl-2': '576px',
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