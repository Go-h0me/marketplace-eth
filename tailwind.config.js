




const defaultTheme = require("tailwindcss/defaultTheme")


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:false,
  // safelist: [
  //   'bg-red-500',
  //   'text-3xl',
  //   'lg:text-4xl',
  // ],
  theme: {
screen:{
  "xs":"475px",
  ...defaultTheme.screens
},


    extend: {

      flex:{
        "2":"2 2 0%",
        "3":"3 3 0%",
        "4":"4 4 0%"
      },
      maxWidth: {
        "8xl":"1920px",
      }
    },
  },
  variants:{
    extend: {
      opacity:["disabled"],
      cursor:["disabled"],
    },
  },
  plugins: [],
};
