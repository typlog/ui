const PRESETS = [
  'gray',
  'slate',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'lime',
  'mint',
  'sky',
]

export const colors: Record<string, any> = {}

PRESETS.forEach(color => {
  const rv: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    rv[`${i}`] = `var(--${color}-${i})`
    rv[`a${i}`] = `var(--${color}-a${i})`
  }
  colors[color] = rv
})

colors.black = generateAlphaColors('black')
colors.black.DEFAULT = '#000'
colors.white = generateAlphaColors('white')
colors.white.DEFAULT = '#fff'

colors.light = {
  '0': 'var(--light-0)',
  surface: 'var(--light-surface)',
  ...generateAlphaColors('light'),
}
colors.dark = {
  '0': 'var(--dark-0)',
  ...generateAlphaColors('dark'),
}
colors.transparent = 'transparent'

function generateAlphaColors (color: string) {
  const rv: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    rv[`a${i}`] = `var(--${color}-a${i})`
  }
  return rv
}
