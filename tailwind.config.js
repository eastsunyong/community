/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      'sm': { 'min': '640px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '1023px' },
      'lg': { 'min': '1023px', 'max': '1279px' },
      'xl': { 'min': '1280px', 'max': '1535px' },
      '2xl': { 'min': '1536px' },
    },
    colors: {
      'error': '#df0c0c',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#dee2e6',
      'gray': '#f8f9fa',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
      'black': '#333333',
      'fontGray': '#999999',
      'labelGray': '#707070'
    },
    fontSize: {
      'xs': '14px',
      's': '16px',
      'm': '20px',
      'l': '24px',
      'xl': '30px',
      '2xl': '40px'
    },
    extend: {
    },
  },
  plugins: [require("tailwindcss-animate")],
};