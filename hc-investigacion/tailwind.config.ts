import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(24, 100%, 50%)',
        secondary: 'hsl(11, 100%, 70%)',
        latex30: 'hsl(202, 100%, 30%)',
        latex10: '#002133',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;

