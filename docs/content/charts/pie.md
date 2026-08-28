---
title: Pie Chart
description: Build full-radius pie charts with accessible legend metadata.
status: alpha
---

Unovis uses `VisDonut` for both pie and donut charts. Set `arc-width="0"` to fill the center and render a pie. Pie charts work best with a small number of categories and a visible legend.

## Default

Place the pie inside `VisSingleContainer`. Use `Donut.selectors.segment` to connect each slice to `ChartTooltip`.

<Example name="charts/Pie.vue" />

## Rounded segments

Padding and corner radius create clearer separation when the chart has only a few substantial slices. Avoid large gaps when values are small because spacing can visually distort the proportions.

<Example name="charts/PieRounded.vue" />

## Half pie

Set `angleRange` to render a semicircle when vertical space is limited. This shape is useful for compact status summaries, but it offers less area for labels and interactions.

<Example name="charts/PieHalf.vue" />

Use a bar chart when precise comparisons matter more than part-to-whole shape, or when the data contains many small categories.
