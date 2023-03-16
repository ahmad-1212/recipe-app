/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      primary: {
        100: "#fef8e7",
        200: "#fdf1d0",
        300: "#fde9b8",
        400: "#fce2a1",
        500: "#fbdb89",
        600: "#c9af6e",
        700: "#978352",
        800: "#645837",
        900: "#322c1b",
      },
      secondary: {
        100: "#fde7e6",
        200: "#fbd0cd",
        300: "#f8b8b4",
        400: "#f6a19b",
        500: "#f48982",
        600: "#c36e68",
        700: "#92524e",
        800: "#623734",
        900: "#311b1a",
      },
      gray: {
        100: "#fcfcfc",
        200: "#faf9f8",
        300: "#f7f5f5",
        400: "#f5f2f1",
        500: "#f2efee",
        600: "#e9e6e5",
        700: "#918f8f",
        800: "#61605f",
        900: "#303030",
      },
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
  },
  plugins: [],
};
