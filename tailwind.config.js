module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
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
