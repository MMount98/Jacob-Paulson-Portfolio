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
    themes: ["light", "black", "retro", "cyberpunk", "valentine", "garden"],
    mytheme: {
      primary: "#14532d",

      secondary: "#78350f",

      accent: "#78350f",

      neutral: "#1c1917",

      "base-100": "#064e3b",

      info: "#38bdf8",

      success: "#38bdf8",

      warning: "#EFD7BB",

      error: "#f3f4f6",
    },
  },
};
