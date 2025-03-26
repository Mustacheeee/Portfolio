/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        'title': ['"Rubik Mono One"', 'monospace'], // For bold, distinctive titles
        'body': ['"Rubik"', 'sans-serif']
      },
      colors: {
        primary: "#000000", // bg
        secondary: "#fbd509", // sub txt
        tertiary: "#979c04",  // card bg
        "mywhite": "#ebe1d7",
        "bigyellow": "#f8df51",
        "highlight": "#fbec04",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        'land-pattern': "url('/src/assets/welcome.png')",
        'connect-pattern': "url('/src/assets/connect.png')",
      },
    },
  },
  plugins: [],
};

