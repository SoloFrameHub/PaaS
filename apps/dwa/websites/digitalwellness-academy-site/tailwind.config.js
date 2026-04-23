/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./site/**/*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'playfair-display': ['"Playfair Display"', 'serif'],
        'playfair': ['"Playfair Display"', 'serif'],
      },
    }
  },
  plugins: [],
}
