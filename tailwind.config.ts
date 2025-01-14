import type { Config } from 'tailwindcss'
import theme from './tailwind'

const config: Config = {
  darkMode: 'class',
  content: [
    './demo/**/*.{vue,ts}',
  ],
  theme: theme,
}

export default config
