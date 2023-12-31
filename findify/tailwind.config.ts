import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        spotifyGreen: '#1DB954',
        spotifyBlack: '#191414',
        spotifyGray: '#282828',
        spotifyOffWhite: '#b3b3b3',
        spotifyLighterGray: '#3e3e3e',
        spotifyBlackBase: '#121212',
      },
      textColor: {
        spotifyGreen: '#1DB954',
        spotifyBlack: '#191414',
        spotifyGray: '#282828',
        spotifyOffWhite: '#b3b3b3',
      },
      borderColor: {
        spotifyGreen: '#1DB954',
        spotifyBlack: '#191414',
      },
      gridTemplateRows: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
export default config;
