/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#030712',
          900: '#0a1628',
          850: '#0c1a30',
          800: '#0f2140',
          700: '#152a52',
        },
        accent: {
          DEFAULT: '#38bdf8',
          soft: '#7dd3fc',
          glow: '#0ea5e9',
          muted: '#1e3a5f',
        },
      },
      backgroundImage: {
        'mesh-hero':
          'radial-gradient(ellipse 120% 80% at 50% -30%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(59,130,246,0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 20%, rgba(14,165,233,0.08), transparent 45%)',
        'mesh-subtle':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.08), transparent 60%)',
        'gradient-rim':
          'linear-gradient(135deg, rgba(56,189,248,0.5) 0%, rgba(59,130,246,0.2) 40%, rgba(255,255,255,0.08) 50%, rgba(59,130,246,0.2) 60%, rgba(56,189,248,0.4) 100%)',
        'slide-fade': 'linear-gradient(180deg, transparent 0%, #030712 100%)',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-lg': '0 24px 80px -24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
        glow: '0 0 0 1px rgba(56,189,248,0.2), 0 20px 50px -20px rgba(14,165,233,0.35)',
        'glow-lg': '0 0 0 1px rgba(56,189,248,0.25), 0 32px 80px -24px rgba(14,165,233,0.4)',
        float: '0 40px 100px -40px rgba(14,165,233,0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
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
