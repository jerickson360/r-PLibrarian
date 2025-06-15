/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1a1d21', // Darkest background
          800: '#252a31', // Lighter background, panels
          700: '#3c424b', // Borders, dividers
          600: '#5c6370', // UI elements, icons
          400: '#9ca3af', // Subtle text
          200: '#e5e7eb', // Primary text
          50: '#f9fafb'   // Hover text
        },
        accent: {
          500: '#3b82f6' // Blue accent
        }
      }
    },
  },
  plugins: [],
}