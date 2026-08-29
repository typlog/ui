---
title: Tailwindcss
description: Use Typlog UI tokens and components with Tailwind CSS v4.
---

Typlog UI exposes its design tokens as CSS variables and Tailwind CSS theme
values. With Tailwind CSS v4, only two library imports are required:

```css
/* app.css */
@import "tailwindcss";
@import "@typlog/ui";

/* Your application styles go last. */
@import "./app-components.css";
```

The first import provides Tailwind's reset and utilities. `@typlog/ui` provides
the component styles, color variables, spacing, typography, shadows, and the
corresponding Tailwind theme values. Import components from JavaScript as usual:

```ts
import { Button, ThemeProvider } from '@typlog/ui'
```

## Cascade layers

Typlog UI establishes this layer order before component styles are emitted:

```css
@layer theme, base, components, utilities;
```

This lets component rules participate in a predictable cascade. Keep ordinary
application CSS unlayered and load it after the package styles when possible.
Unlayered rules have higher cascade priority than rules in any named layer, so
they can override layered Typlog UI rules without `!important`. If both rules
are unlayered, normal specificity and source order apply; in that case your app
rule should be loaded after the package rule (or use a more specific selector).
If you define your own layers, keep them inside the contract above or add them
to the layer order explicitly. Tailwind utilities remain later than component
styles, as expected by Tailwind's v4 cascade model.
