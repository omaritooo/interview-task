/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        lp: "1440px",
        "2xl": "1680px",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          xs: "440px",
          sm: "570px",
          md: "708px",
          lg: "924px",
          xl: "1100px",
          lp: "1300px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
};
