---
title: Charts
description: Theme-aware chart primitives for Unovis.
status: alpha
source: https://github.com/typlog/ui/tree/main/src/charts
---

Typlog UI charts provide a small theme and presentation layer around [Unovis](https://unovis.dev/). Install the optional peer dependencies when using this entry:

```sh
npm install @typlog/ui @unovis/ts @unovis/vue
```

`ChartRoot` supplies series metadata, palette variables, and responsive layout. Mark the domain field with `role: 'x'`; it is excluded from legends and series colors while becoming the default tooltip heading. All other entries default to `role: 'series'`. Standard attributes such as `role`, `aria-label`, and `aria-describedby` are forwarded to the root primitive.

The `ChartRoot` default slot exposes `{ mounted }`. Use it to delay Unovis containers until the component has mounted in the browser; this keeps SSR and documentation builds free of client-only chart initialization. Compose `ChartRoot` with raw Unovis primitives so each chart can use the full Unovis API without a large wrapper prop surface.

<Example name="charts/Overview.vue" />

The adapter follows the same composition principle described by [shadcn-vue's chart documentation](https://www.shadcn-vue.com/docs/components/chart): Unovis remains visible in application code, while Typlog provides shared configuration, colors, accessibility, legend, and tooltip presentation. This avoids locking chart behavior behind a second prop API.

## Choose a guide

- Start with [Line](/charts/line), [Bar](/charts/bar), [Pie](/charts/pie), or [Donut](/charts/donut) for chart-specific composition.
- Use [Tooltip](/charts/tooltip) and [Legend](/charts/legend) for presentation helpers.
- Use [States](/charts/states) for loading and empty dashboard panels.
- See [API Reference](/charts/api) for the complete Typlog wrapper props.
