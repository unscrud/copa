/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors: {
        ignite: {
          500: '#129E57'
        },
        gray: {
          100: '#E1E1E6',
          900: '#121214'
        }
      }
    }
  },
  plugins: []
}
