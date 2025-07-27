---
title: Shadows
status: stable
source: https://github.com/typlog/ui/tree/main/src/styles/shadow.css
radix: https://www.radix-ui.com/themes/docs/theme/shadows
---

Shadows used in the components are derived from a 6-step scale.

<div class="grid grid-cols-6 gap-4 p-5 bg-gray-a1 border rounded">
  <div v-for="i in 6" :key="i" class="h-10 rounded-sm bg-(--color-background)" :style="{boxShadow: `var(--shadow-${i})`}">
  </div>
</div>
<div class="mt-2 grid grid-cols-6 gap-4 px-6 text-sm">
  <div class="text-center" v-for="i in 6" :key="i">{{ i }}</div>
</div>

## Shadow tokens

Shadow tokens can be accessed using CSS variables. You can use these tokens to style your custom components,
ensuring they are consistent with the rest of your theme.

```css
/* Inset shadow */
var(--shadow-1);

/* Shadows for variant="classic" panels, like Card */
var(--shadow-2);
var(--shadow-3);

/* Shadows for smaller overlay panels, like Hover Card and Popover */
var(--shadow-4);
var(--shadow-5);

/* Shadows for larger overlay panels, like Dialog */
var(--shadow-6);
```
