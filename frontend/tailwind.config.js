/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4e46e5',
        'secondary': '#DDE546',
        'success': '#43A047',
        'danger': '#E53935',
      },
    },
  },
  plugins: [],
}