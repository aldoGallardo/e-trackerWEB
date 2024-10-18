/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,ts}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
