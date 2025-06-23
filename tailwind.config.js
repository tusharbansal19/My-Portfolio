module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "rotate-squeeze": "rotateSqueeze 2s infinite",
      },
      keyframes: {
        rotateSqueeze: {
          "0%": {
            transform: "rotate(0deg) scaleY(1)",
          },
          "50%": {
            transform: "rotate(180deg) scaleY(0.6)",
          },
          "100%": {
            transform: "rotate(360deg) scaleY(1)",
          },
        },
      },
    },
  },
  darkMode: "class", // Enable dark mode with 'class' method
};
