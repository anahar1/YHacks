module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FFA500', // Adjust the color code as needed
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};