---
title: Bar Chart
description: Build grouped bar charts with Typlog theme tokens.
status: alpha
---

Bar charts are best for discrete comparisons. Use grouped bars to compare peers, a single series to rank categories, and stacked bars when both the total and its composition matter.

## Grouped bars

Pass one y-accessor per series to `VisGroupedBar`. Keep the same key order in `ChartRoot.config` so the bars, tooltip rows, and legend use identical colors.

<Example name="charts/Bar.vue" />

## Single series

Use one accessor when each category has one value. A local series color and rounded corners can provide emphasis without adding a legend that repeats the axis labels.

<Example name="charts/BarSingle.vue" />

## Stacked bars

Use `VisStackedBar` for part-to-whole comparisons across several categories. Keep the legend visible because the segment names are not carried by the axis.

<Example name="charts/BarStacked.vue" />

Start the value axis at zero unless the chart explicitly communicates a bounded deviation. Truncated bar axes exaggerate small differences in length.
