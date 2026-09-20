/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mayor: '#3b82f6',
        small_company: '#10b981',
        tech_giant: '#8b5cf6',
        small_nation: '#f59e0b',
        superpower: '#ef4444',
      }
    },
  },
  plugins: [],
}
