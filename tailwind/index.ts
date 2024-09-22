import screens from './breakpoints'
import { colors } from './colors'
import { keyframes, animation } from './animation'

export default {
  screens,
  colors,
  extend: {
    keyframes,
    animation,
    fontFamily: {
      'sans': [
        'system-ui', '-apple-system', 'BlinkMacSystemFont',
        'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',
      ],
    },
    borderColor: {
      DEFAULT: 'var(--gray-a5)',
    },
  },
}
