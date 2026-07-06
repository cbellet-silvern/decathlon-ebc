/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Decathlon graphic charter — light theme
        page: '#eef1f7', // app background
        panel: '#ffffff',
        panel2: '#f3f5fb',
        edge: '#e3e7f2',
        ink: '#101733', // primary text
        muted: '#5f6a87',
        brand: '#3643ba', // Decathlon Blue
        accent2: '#00885e', // success text / positive deltas
        warn: '#b45309',
        danger: '#c02f2f',
        ok: '#0a7d0a',
        review: '#7c5cff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
