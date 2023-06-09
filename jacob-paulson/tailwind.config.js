/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(255, 255, 255)",
      },
      visibility: ["group-hover"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "black",
      "retro",
      "cyberpunk",
      "valentine",
      "garden",
      {
        MyTheme: {
          primary: "#f0abfc",

          secondary: "#9ca3af",

          accent: "#f5d0fe",

          neutral: "#d1d5db",

          "base-100": "#d6d3d1",

          info: "#f0abfc",

          success: "#f0abfc",

          warning: "#fce7f3",

          error: "#fce7f3",
        },
      },
    ],
  },
};
