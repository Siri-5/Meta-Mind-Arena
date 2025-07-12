/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Correct path for app directory
    './pages/**/*.{js,ts,jsx,tsx}', // If you're using pages directory (legacy)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


