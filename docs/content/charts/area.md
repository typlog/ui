---
title: Area Chart
description: Build stacked area charts with theme-aware SVG gradients.
status: alpha
---

Area charts emphasize magnitude as well as direction. They work best for totals, volume, and cumulative series where the filled region has meaning.

## Stacked gradient

Use `VisArea` inside `ChartAreaGradient` when each stacked series needs a gradient derived from the `ChartRoot` palette. The slot exposes `svgDefs` for the Unovis container and a matching `color` accessor for the area.

<Example name="charts/Area.vue" />

Pass `svgDefs` to `VisXYContainer`; Unovis inserts the definitions into its internal SVG so area paths can resolve their gradient URLs. Keep the series order in `VisArea.y` aligned with `ChartRoot.config`.

## Single series

A single gradient area is useful for request volume, traffic, or storage over time. Enabling the area line preserves a crisp boundary while the fill communicates magnitude.

<Example name="charts/AreaSingle.vue" />

## Solid fill

Gradients are optional. Use palette colors directly for a quieter stacked area chart, and lower the opacity so overlapping grid lines and boundaries stay legible.

<Example name="charts/AreaSolid.vue" />

Stacked areas communicate totals and composition, not precise comparison between individual series. Prefer grouped bars when readers need to compare exact values across categories.
