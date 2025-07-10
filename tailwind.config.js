/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-jakarta)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}

