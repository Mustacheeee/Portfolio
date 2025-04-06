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
      fontWeight: {
        body: '500',
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
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backgroundImage: {
        'welcome-pattern': "url('/src/assets/welcome.png')",
        'connect-pattern': "url('/src/assets/connect.png')",
      },
    },
  },
  plugins: [],
};

