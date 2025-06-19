const nativewindPreset = require('nativewind/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [nativewindPreset],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
