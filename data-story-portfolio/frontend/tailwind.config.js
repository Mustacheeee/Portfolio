/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        title: ['"Rubik Mono One"', 'system-ui', 'sans-serif'],
        body: ['"Rubik"', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        body: '300',
      },
      colors: {
        primary: "#050505",
        secondary: "#fbd509",
        tertiary: "#979c04",
        mywhite: "#ebe1d7",
        bigyellow: "#f8df51",
        highlight: "#fbec04",
        surface: "#141414",
        "surface-light": "#1e1e1e",
        muted: "#dfd9cc",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "345px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backgroundImage: {
        'welcome-pattern': "url('/src/assets/Welcome.png')",
        'connect-pattern': "url('/src/assets/connect.png')",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};

