/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Decathlon dark theme
        ink: '#0b0f1a',
        panel: '#111729',
        panel2: '#172136',
        edge: '#26314f',
        silver: '#cdd6ea',
        muted: '#8b96b2',
        brand: '#3643ba', // Decathlon blue — chrome/logo only
        accent: '#5b6cff',
        accent2: '#22c48b',
        warn: '#fab219',
        danger: '#e05252',
        ok: '#0ca30c',
        review: '#9085e9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
