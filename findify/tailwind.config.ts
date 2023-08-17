import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'spotifyGreen': '#1DB954',
        'spotifyBlack': '#191414',
      },
      textColor: {
        'spotifyGreen': '#1DB954',
        'spotifyBlack': '#191414',
      },
      borderColor: {
        'spotifyGreen': '#1DB954',
        'spotifyBlack': '#191414',
      }
    },
  },
  plugins: [],
}
export default config
