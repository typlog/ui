---
title: Color
description: The color system is built using Radix Colors for consistent and accessible theming.
status: stable
source: https://github.com/typlog/ui/tree/main/src/styles/color.css
radix: https://www.radix-ui.com/themes/docs/theme/color
---

<script setup>
  const accentColors = [
    'gray',   'gold',    'bronze',
    'brown',  'yellow',  'amber',
    'orange', 'tomato',  'red',
    'ruby',   'crimson', 'pink',
    'plum',   'purple',  'violet',
    'iris',   'indigo',  'blue',
    'cyan',   'teal',    'jade',
    'green',  'grass',   'lime',
    'mint',   'sky'
  ]
  const grayColors = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand']
</script>

## Accents

The accent color defines the dominant color in your theme and is applied to primary buttons,
links, and other interactive components. To set it globally, pass the `accentColor` prop to
the `ThemeProvider`:

```vue
<template>
  <ThemeProvider accent-color="indigo">
    <!-- your application -->
  </ThemeProvider>
</template>
```

### Available colors

The color system is based on [Radix Colors](https://www.radix-ui.com/colors), and you can choose
from a wide range of accent color palettes, including:

<div class="flex flex-wrap gap-2">
  <div v-for="color in accentColors" :key="color" class="flex flex-col gap-1">
    <div class="w-20 h-12" :style="{backgroundColor: `var(--${color}-9)`, borderRadius: 'var(--radius-1)'}">
    </div>
    <div class="text-xs text-gray-10">{{ color }}</div>
  </div>
</div>

### Color shades

Each accent color includes 12 shades, with both solid and transparent variants.
For example, the `indigo` scale:

<div class="grid grid-cols-12 gap-2">
  <div v-for="i in 12" :key="i" class="flex flex-col gap-1">
    <div class="h-8" :style="{backgroundColor: `var(--indigo-${i})`, borderRadius: 'var(--radius-1)'}">
    </div>
    <div class="transparent-grid" style="border-radius: var(--radius-1)">
      <div class="h-8" :style="{backgroundColor: `var(--indigo-a${i})`, borderRadius: 'var(--radius-1)'}">
      </div>
    </div>
    <div class="text-sm text-center text-gray-10">{{i}}</div>
  </div>
</div>

## Grays

```vue
<template>
  <ThemeProvider gray-color="slate">
    <!-- your application -->
  </ThemeProvider>
</template>
```

### Gray colors

<div class="flex flex-wrap gap-2">
  <div v-for="color in grayColors" :key="color" class="flex flex-col gap-1">
    <div class="w-20 h-12" :style="{backgroundColor: `var(--${color}-9)`, borderRadius: 'var(--radius-1)'}">
    </div>
    <div class="text-xs text-gray-10">{{ color }}</div>
  </div>
</div>

### Gray shades

<div class="grid grid-cols-12 gap-2">
  <div v-for="i in 12" :key="i" class="flex flex-col gap-1">
    <div class="h-8" :style="{backgroundColor: `var(--slate-${i})`, borderRadius: 'var(--radius-1)'}">
    </div>
    <div class="transparent-grid" style="border-radius: var(--radius-1)">
      <div class="h-8" :style="{backgroundColor: `var(--slate-a${i})`, borderRadius: 'var(--radius-1)'}">
      </div>
    </div>
    <div class="text-sm text-center text-gray-10">{{i}}</div>
  </div>
</div>
