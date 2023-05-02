/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fef8f8",
        gray: "#0000006b",
        textBlue: "#0e82f4",
      },
    },
    maxHeight: {
      "2/4": "63vh",
    },
  },
  plugins: [],
};
