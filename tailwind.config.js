/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Newsreader', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      screens: { xs: '460px' },
    },
  },
  plugins: [],
}
