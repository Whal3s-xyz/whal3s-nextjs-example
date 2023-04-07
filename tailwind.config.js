/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whal3s: {
          '50': '#edf0ff',
          '100': '#dee5ff',
          '200': '#c4cdff',
          '300': '#a0acff',
          '400': '#7a80ff',
          '500': '#5d5afa',
          '600': '#503eef',
          '700': '#422fd3',
          '800': '#3729aa',
          '900': '#302986',
        },
      },
    },
  },
}

