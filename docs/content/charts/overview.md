---
title: Charts
description: Theme-aware chart primitives for Unovis.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/charts
---

Typlog UI charts combine [Unovis](https://unovis.dev/) rendering primitives with Typlog's theme, palette, tooltip, and legend components. Unovis remains responsible for scales, geometry, animation, and interaction; the chart package keeps presentation and series metadata consistent across a dashboard.

Install the chart entry and its optional peer dependencies:

```sh
pnpm add @typlog/ui @unovis/ts @unovis/vue
```

Import the chart stylesheet alongside the chart entry:

```css
@import "@typlog/ui/charts";
```

## Example

The following area chart shows the complete composition: `ChartRoot` provides configuration and theme colors, `ChartAreaGradient` supplies SVG definitions, and the Unovis container owns the chart geometry.

<Example name="charts/Area.vue" />

## Composition

`ChartRoot` is the shared boundary for every example in this section. Its `config` maps data keys to labels, optional colors, and optional Iconify icons. Mark the domain field with `role: 'x'`; it is excluded from series colors and legends while becoming the default tooltip heading. Every other entry defaults to `role: 'series'`.

Place raw Unovis components inside `ChartRoot`:

- Use `VisXYContainer` for line, area, grouped bar, and stacked bar charts.
- Use `VisSingleContainer` for pie and donut charts.
- Add `ChartTooltip` and `ChartCrosshair` for XY hover interactions.
- Add `ChartLegend` when color needs a persistent text label.

The `ChartRoot` default slot exposes `{ mounted }`. Render Unovis containers with `v-if="mounted"` so browser-only chart initialization does not run during SSR. Standard DOM and ARIA attributes such as `role`, `aria-label`, and `aria-describedby` are forwarded to the root primitive.

## Colors and series order

Series use the Typlog chart palette unless their config entry supplies a `color`. Keep the order of `ChartRoot.config` aligned with accessor arrays passed to Unovis. The same order controls chart colors, tooltip rows, and legend entries.

## Choose a guide

- Use [Line](/charts/line) for trends and change over a continuous domain.
- Use [Area](/charts/area) when magnitude or accumulation matters in addition to the trend.
- Use [Bar](/charts/bar) for precise comparisons between categories or series.
- Use [Pie](/charts/pie) and [Donut](/charts/donut) for small part-to-whole summaries.
- Use [Tooltip](/charts/tooltip) and [Legend](/charts/legend) for presentation helpers.
- Use [States](/charts/states) for loading and empty dashboard panels.
- See [API Reference](/charts/api) for the complete Typlog wrapper props.
