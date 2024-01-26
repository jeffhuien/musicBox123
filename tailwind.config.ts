/*
 * @Author: GAO GAO
 * @Date: 2023-10-23 19:31:00
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite ',
      },
    },
  },
  plugins: [],
}
