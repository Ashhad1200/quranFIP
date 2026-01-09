/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // ===== COLORS =====
            colors: {
                // Dark Backgrounds (Teal-Black)
                dark: {
                    primary: '#010503',
                    secondary: '#0a0f0d',
                    tertiary: '#121817',
                    card: 'rgba(10, 15, 13, 0.7)',
                    'card-solid': '#0a0f0d',
                    hover: '#1a1f1d',
                },
                // Neon Lime Palette
                lime: {
                    neon: '#BFFF00',
                    dark: '#A9F21D',
                    darker: '#8FD916',
                    light: '#D4FF33',
                    lighter: '#E5FF66',
                },
                // Text Colors
                text: {
                    primary: '#FFFFFF',
                    secondary: '#A0AFA0',
                    tertiary: '#6B7A6B',
                    disabled: '#3A453A',
                },
                // Semantic Colors
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#3b82f6',
                // Glassmorphism
                glass: {
                    bg: 'rgba(10, 15, 13, 0.7)',
                    'bg-strong': 'rgba(10, 15, 13, 0.85)',
                    border: 'rgba(191, 255, 0, 0.2)',
                },
            },
            // ===== FONTS =====
            fontFamily: {
                arabic: ["'Amiri Quran'", "'Scheherazade New'", "'Traditional Arabic'", 'serif'],
                primary: ["'Plus Jakarta Sans'", "'Inter'", "'Poppins'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
                secondary: ["'Inter'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
            },
            // ===== FONT SIZES =====
            fontSize: {
                // Arabic sizes
                'arabic-xs': '20px',
                'arabic-sm': '24px',
                'arabic-md': '28px',
                'arabic-lg': '32px',
                'arabic-xl': '40px',
                'arabic-2xl': '48px',
            },
            // ===== BOX SHADOW =====
            boxShadow: {
                'glow-sm': '0 0 10px rgba(191, 255, 0, 0.3)',
                'glow-md': '0 0 20px rgba(191, 255, 0, 0.4), 0 0 40px rgba(191, 255, 0, 0.2)',
                'glow-lg': '0 0 30px rgba(191, 255, 0, 0.5), 0 0 60px rgba(191, 255, 0, 0.3), 0 0 90px rgba(191, 255, 0, 0.1)',
                'glow-xl': '0 0 40px rgba(191, 255, 0, 0.6), 0 0 80px rgba(191, 255, 0, 0.4), 0 0 120px rgba(191, 255, 0, 0.2)',
            },
            // ===== BORDER RADIUS =====
            borderRadius: {
                'xl': '16px',
                '2xl': '24px',
            },
            // ===== BACKDROP BLUR =====
            backdropBlur: {
                'glass': '10px',
                'glass-strong': '20px',
            },
            // ===== ANIMATIONS =====
            animation: {
                'button-glow': 'buttonGlow 1.5s ease-in-out infinite',
                'slide-in-left': 'slideInLeft 250ms ease-out',
                'slide-in-right': 'slideInRight 250ms ease-out',
                'fade-in': 'fadeIn 200ms ease-out',
                'mic-pulse': 'micPulse 1.2s ease-in-out infinite',
                'neon-pulse': 'neonGlowPulse 2s ease-in-out infinite',
                'skeleton': 'skeleton 1.5s ease-in-out infinite',
                'page-enter': 'fadeInUp 0.4s ease-out',
                'quiz-correct': 'correctPulse 0.6s ease-out forwards',
                'quiz-wrong': 'wrongFlash 0.6s ease-out',
                'spin': 'spin 1s linear infinite',
                'bounce': 'bounce 1s ease-in-out infinite',
                'shake': 'shake 0.5s ease-in-out',
                'typing-dot': 'typingDot 1.4s ease-in-out infinite',
                'gradient-shift': 'gradientShift 3s ease infinite',
            },
            keyframes: {
                buttonGlow: {
                    '0%': { boxShadow: '0 0 5px rgba(191, 255, 0, 0.2)' },
                    '50%': { boxShadow: '0 0 20px rgba(191, 255, 0, 0.4), 0 0 40px rgba(191, 255, 0, 0.2)' },
                    '100%': { boxShadow: '0 0 5px rgba(191, 255, 0, 0.2)' },
                },
                slideInLeft: {
                    from: { transform: 'translateX(-100%)', opacity: '0' },
                    to: { transform: 'translateX(0)', opacity: '1' },
                },
                slideInRight: {
                    from: { transform: 'translateX(100%)', opacity: '0' },
                    to: { transform: 'translateX(0)', opacity: '1' },
                },
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInUp: {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                micPulse: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(191, 255, 0, 0.7)', transform: 'scale(1)' },
                    '50%': { boxShadow: '0 0 0 20px rgba(191, 255, 0, 0)', transform: 'scale(1.05)' },
                },
                neonGlowPulse: {
                    '0%, 100%': { boxShadow: '0 0 10px rgba(191, 255, 0, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(191, 255, 0, 0.5), 0 0 60px rgba(191, 255, 0, 0.3), 0 0 90px rgba(191, 255, 0, 0.1)' },
                },
                skeleton: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
                correctPulse: {
                    '0%': { backgroundColor: 'rgba(10, 15, 13, 0.7)', borderColor: 'transparent' },
                    '50%': { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981', boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' },
                    '100%': { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' },
                },
                wrongFlash: {
                    '0%, 100%': { backgroundColor: 'rgba(10, 15, 13, 0.7)', borderColor: 'transparent' },
                    '25%, 75%': { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444' },
                    '50%': { backgroundColor: 'rgba(239, 68, 68, 0.3)', borderColor: '#ef4444', boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' },
                },
                typingDot: {
                    '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
                    '30%': { transform: 'translateY(-10px)', opacity: '1' },
                },
                gradientShift: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
            // ===== Z-INDEX =====
            zIndex: {
                'dropdown': '1000',
                'sticky': '1020',
                'fixed': '1030',
                'modal-backdrop': '1040',
                'modal': '1050',
                'popover': '1060',
                'tooltip': '1070',
            },
            // ===== TRANSITIONS =====
            transitionDuration: {
                'fast': '150ms',
                'base': '250ms',
                'slow': '350ms',
            },
        },
    },
    plugins: [],
}
