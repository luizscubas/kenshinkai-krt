/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        tatame: '#0B0C0E',
        surface: {
          dark: '#15171B',
          card: '#1F2228',
        },
        crimson: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
        },
        gold: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        title: ['"Zenzai Itacha"', 'serif'],
        body: ['Panoragraf', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
