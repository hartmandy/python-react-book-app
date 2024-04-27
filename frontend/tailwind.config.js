/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "1rem",
      },
      spacing: {
        22: "5.5rem",
      },
      zIndex: {
        2: 2,
      },
    },
  },
  plugins: [],
};
