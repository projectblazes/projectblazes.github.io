/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'moveX': 'moveX 20s linear infinite',
        'moveY': 'moveY 20s linear infinite',
        'moveBeam': 'moveBeam 8s linear infinite',
        'float': 'float 15s ease-in-out infinite',
        'digitalRain': 'digitalRain 20s linear infinite',
        'fadeInOut': 'fadeInOut 2s linear infinite',
        'glow': 'glow 10s ease-in-out infinite',
        'orb': 'orb 7s ease-in-out infinite',
        'neonPulse': 'neonPulse 3s ease-in-out infinite',
        'wavePath': 'wavePath 20s linear infinite',
        'circuitFlow': 'circuitFlow 15s linear infinite',
        'circuitFlowVertical': 'circuitFlowVertical 15s linear infinite',
        'particle': 'particle 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        moveX: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        moveY: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 400px' },
        },
        moveBeam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { 
            transform: 'translate(0, 0)',
            opacity: '0.2'
          },
          '50%': { 
            transform: 'translate(20px, -20px)',
            opacity: '0.4'
          }
        },
        digitalRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        orb: {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.3'
          },
          '50%': { 
            transform: 'translate(20px, -20px) scale(1.1)',
            opacity: '0.5'
          }
        },
        neonPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' }
        },
        wavePath: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        circuitFlow: {
          '0%': { transform: 'translateX(-100%) rotate(var(--rotate, -5deg))', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateX(100%) rotate(var(--rotate, -5deg))', opacity: 0 }
        },
        circuitFlowVertical: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 }
        },
        particle: {
          '0%, 100%': { 
            transform: 'translate(0, 0)',
            opacity: 'var(--opacity, 0.2)'
          },
          '25%': {
            transform: 'translate(100px, -50px)',
            opacity: 'var(--opacity, 0.4)'
          },
          '50%': {
            transform: 'translate(0, -100px)',
            opacity: 'var(--opacity, 0.2)'
          },
          '75%': {
            transform: 'translate(-50px, -25px)',
            opacity: 'var(--opacity, 0.3)'
          }
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
} 