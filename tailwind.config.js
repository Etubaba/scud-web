/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,

  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        scudGreen: " #0217EB",
        scudGreenHover: "#000fb2",
        secondarybutton: "#DEE4FF",
        gradientblue: "#021977",
        scudGray: "#F8F8F9",
        scudWhite: "#FFFFF",
        scudBlack: "#000000",
        text_color: "#929395",
        textColor: "#55575F",
        title: "#1E202B",
        outlineColor: "#339AF0",
        adminbg: "#FBFBFF",
        scudyellow: "#FFBD3D"
      }
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      "90%": "90%",
      "100%": "100%",
      16: "4rem"
    },
    fontFamily: {
      gilroyBold: ["Gilroy-bold", "sans-serif"],
      gilroyMedium: ["Gilroy-medium", "sans-serif"],
      gilroySemibold: ["Gilroy-semibold", "sans-serif"],
      gilroyRegular: ["Gilroy-regular", "sans-serif"]
    }
  },
  plugins: []
};
