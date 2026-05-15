/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        surface: {
          DEFAULT: 'rgba(15, 23, 42, 0.55)',
          light: 'rgba(30, 41, 59, 0.45)',
        },
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.85) 55%, rgb(2 6 23) 100%), radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.35), transparent)',
        'glow-radial':
          'radial-gradient(600px circle at 10% 10%, rgba(99,102,241,0.18), transparent 40%), radial-gradient(500px circle at 90% 20%, rgba(56,189,248,0.12), transparent 45%), radial-gradient(400px circle at 50% 100%, rgba(244,114,182,0.08), transparent 40%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(2, 6, 23, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        glow: '0 0 0 1px rgba(99,102,241,0.25), 0 20px 60px -20px rgba(99,102,241,0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
