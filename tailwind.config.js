/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",     // Blue
        secondary: "#BFDBFE",   // Light Blue
        white: "#ffffff",
        black: "#000000",
        gray: "#666666",
        lightGray: "#f5f5f5",
        darkGray: "#333333",
        purple: "#6b46c1",
        green: "#10b981",
        orange: "#f59e0b",
      },
    },
  },
  plugins: [],
};
