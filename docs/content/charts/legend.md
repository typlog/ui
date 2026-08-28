---
title: Chart Legend
description: Render accessible series labels from ChartConfig.
status: alpha
---

`ChartLegend` reads the ordered `ChartRoot.config`, renders a semantic list, and uses the same resolved palette as the chart. It is intentionally display-only; filtering and series visibility remain application state.

<Example name="charts/Legend.vue" />

Use the `item` slot to replace the complete row or the `marker` slot to replace only the color marker. Both receive the config key, series metadata, and series index.
