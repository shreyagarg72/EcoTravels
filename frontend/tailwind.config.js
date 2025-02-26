// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        secondary: {
          light: '#bae6fd',
          DEFAULT: '#38bdf8',
          dark: '#0284c7',
        },
        // Tier colors
        free: '#94a3b8',
        standard: '#60a5fa',
        premium: '#facc15',
      },
    },
  },
  plugins: [],
};
