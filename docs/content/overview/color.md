---
title: Color
description: Understanding the color system and its application in your theme.
---

<script setup>
  const colors = [
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
</script>

## Accents

Accent color is the most dominant color in your theme. It is used for primary buttons,
links and other interactive elements. `accentColor` is specified directly on the ThemeProvider:

```vue
<template>
  <ThemeProvider accent-color="indigo">
    <!-- your application -->
  </ThemeProvider>
</template>
```

### Available accent colors

There is a range of accent colors to choose from:

<div class="flex flex-wrap gap-2">
  <div v-for="color in colors" :key="color" :data-accent-color="color" class="flex flex-col gap-1">
    <div class="w-20 h-12" :style="{backgroundColor: 'var(--accent-9)', borderRadius: 'var(--radius-1)'}">
    </div>
    <div class="text-xs text-gray-10">{{ color }}</div>
  </div>
</div>
