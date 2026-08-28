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

## Horizontal bars

Set `orientation` to `Orientation.Horizontal` when category labels need more room or when ranking is easier to scan from top to bottom. The data accessor stays on `x` and the value accessor stays on `y`; only their rendered axes change, so category ticks belong to the y-axis and numeric values belong to the x-axis.

Use `Direction.South` on the container to keep the first data item at the top. Because the standard crosshair follows the horizontal x-domain, attach `ChartTooltip` directly to `GroupedBar.selectors.bar` for horizontal bars.

<Example name="charts/BarHorizontal.vue" />
