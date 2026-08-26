/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050507",
        foreground: "#f3f4f6",
        brand: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          900: '#1e1b4b',
          accent: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 12s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee2': 'marquee2 28s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'neon-flicker': 'neon-flicker 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'rotate-cube': 'rotateCube 20s linear infinite',
        'rotate-ring': 'rotateRing 15s linear infinite',
        'rotate-diamond': 'rotateDiamond 12s ease-in-out infinite',
        'float-triangle': 'floatTriangle 8s ease-in-out infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
        'float-slow-3d': 'floatSlow 9s ease-in-out infinite',
        'float-medium-3d': 'floatMedium 6s ease-in-out infinite',
        'float-fast-3d': 'floatFast 4s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-expand': 'pulseExpand 2s ease-in-out infinite',
        'modal-slide-up': 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-slide-in': 'toastSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'border-glow': {
          '0%, 100%': { boxShadow: '0 0 0px rgba(201,247,49,0)' },
          '50%': { boxShadow: '0 0 20px rgba(201,247,49,0.3), 0 0 40px rgba(201,247,49,0.1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow: '0 0 4px #c9f731, 0 0 10px #c9f731, 0 0 20px #c9f731',
          },
          '20%, 24%, 55%': { textShadow: 'none' },
        },
        rotateCube: { '0%': { transform: 'rotateX(0deg) rotateY(0deg)' }, '100%': { transform: 'rotateX(360deg) rotateY(360deg)' } },
        rotateRing: { '0%': { transform: 'rotateX(70deg) rotateZ(0deg)' }, '100%': { transform: 'rotateX(70deg) rotateZ(360deg)' } },
        rotateDiamond: { '0%, 100%': { transform: 'rotate(0deg) scale(1)', opacity: '0.6' }, '50%': { transform: 'rotate(180deg) scale(1.2)', opacity: '1' } },
        floatTriangle: { '0%, 100%': { transform: 'translateY(0) rotate(0deg)' }, '33%': { transform: 'translateY(-20px) rotate(120deg)' }, '66%': { transform: 'translateY(10px) rotate(240deg)' } },
        gridScroll: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '0 80px' } },
        floatSlow: { '0%, 100%': { transform: 'translateY(0) translateX(0)' }, '50%': { transform: 'translateY(-25px) translateX(10px)' } },
        floatMedium: { '0%, 100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-18px) rotate(5deg)' } },
        floatFast: { '0%, 100%': { transform: 'translateY(0) scale(1)' }, '50%': { transform: 'translateY(-12px) scale(1.05)' } },
        floatReverse: { '0%, 100%': { transform: 'translateY(0) translateX(0)' }, '50%': { transform: 'translateY(20px) translateX(-15px)' } },
        pulseExpand: { '0%, 100%': { transform: 'scale(1)', opacity: '0.5' }, '50%': { transform: 'scale(1.8)', opacity: '0' } },
        modalSlideUp: { from: { opacity: '0', transform: 'translateY(20px) scale(0.95)' }, to: { opacity: '1', transform: 'translateY(0) scale(1)' } },
        toastSlideIn: { from: { opacity: '0', transform: 'translateX(40px) scale(0.9)' }, to: { opacity: '1', transform: 'translateX(0) scale(1)' } },
      },
    },
  },
  plugins: [],
};
