module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  media: false,
  theme: {
    extend: {
      outline: {
        red: ['2px solid red', '1px'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
