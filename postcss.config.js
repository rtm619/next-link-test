module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url')({ url: 'inline' }),
    require('tailwindcss')('./static/css/tailwind.js'),
    require('autoprefixer'),
  ],
};
