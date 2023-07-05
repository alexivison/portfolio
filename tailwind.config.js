const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      black: "#111111",
      white: "#DADADA",
      subtext: {
        dark: "#7c7c7c",
        light: "#5f5f5f",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
