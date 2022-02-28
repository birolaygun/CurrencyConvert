module.exports = {
  important: true,

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwindcss-animation-delay")],

  theme: {
    fontFamily: {
      sans: ["Hind Siliguri", "sans-serif"],
      title: ["Verdana", "sans-serif"],
      narrow: ["Arial Narrow", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      white: "#FFF",
      black: "#000",

      navy: "#001474",
      mediumBlue: "#002cff",
      LightBlue: "#2147ff",
      darkBlue: "#0a146e",

      gray: {
        100: "#E0E0E0",
        200: "#BDBDBD",
        300: "#9E9E9E",
        400: "#757575",
        DEFAULT: "#616161",
        600: "#43484a",
        700: "#36363b",
        800: "#27272c",
        900: "#212126",
      },
      green: {
        light: "#87E08D",
        DEFAULT: "#5AD363",
        dark: "#36C941",
      },
      red: {
        DEFAULT: "#F44336",
        600: "#E53935",
        700: "#D32F2F",
      },
    },

    extend: {
      boxShadow: {
        card: "0px 2px 4px 0px rgba(14, 30, 37, 0.12), 0px 2px 16px 0px rgba(14, 30, 37, 0.32)",
        flag: "0 0 3px 1px #1d2021",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fill, minmax(232px, 1fr))",
      },
      keyframes: {
        slideInLeft: {
          "0%": {
            transform: "scela(100%)",
          },
          "100%": {
            transform: "scela(50%)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeInDown: {
          "0%": {
            opacity: 0,
            transform: "translateY(-10%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 500ms",
        fadeIn: "fadeIn 500ms",
        fadeInDown: "fadeInDown 500ms",
      },
    },
  },
  corePlugins: {
    container: false,
  },
};
