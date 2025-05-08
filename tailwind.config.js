export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        infocus: {
          // Primary
          primary: '#0A0F2F',      // Ink Navy
          accent: '#FFD500',       // Focus Yellow

          // Background & Surface
          canvas: '#F9FAFB',
          surface: '#FFFDF6',
          divider: '#E5E7EB',

          // Text
          text: '#1A1A1A',
          subtext: '#5E5E5E',
          muted: '#9CA3AF',
          // State
          success: '#1BA784',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'Satoshi',
          'system-ui',
          '-apple-system',
          'sans-serif'
        ],
      },
      borderRadius: {
        card: '1rem', // 카드에 적용할 기본 radius
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} 