---
title: Line Chart
description: Compose line series with numeric or date domains.
status: alpha
---

Line charts are the default choice for showing change over an ordered domain. Use `VisLine` inside `VisXYContainer`; for categorical labels, map rows to numeric indexes and format the x-axis ticks back to text.

## Multiple series

Pass an accessor array to `y` when the series share the same domain. Keep that array in the same order as the non-domain entries in `ChartRoot.config`.

<Example name="charts/Line.vue" />

## Single series

A single accessor keeps the chart focused and lets the series config provide a local palette override. A thicker line works well when there is no second series to distinguish.

<Example name="charts/LineSingle.vue" />

## Dashed comparison

Use a dashed line for a target, forecast, or previous period rather than introducing another saturated color. The dash accessor receives the series index.

<Example name="charts/LineDashed.vue" />

Avoid placing unrelated metrics on the same line chart. If the series require different units or scales, separate them into charts or normalize the data explicitly.
