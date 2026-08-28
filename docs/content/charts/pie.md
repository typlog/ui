---
title: Pie Chart
description: Build full-radius pie charts with accessible legend metadata.
status: alpha
---

Unovis uses `VisDonut` for both pie and donut charts. Set `arc-width="0"` to fill the center and render a pie. Place it inside `VisSingleContainer`, then use `Donut.selectors.segment` when each slice needs a tooltip.

<Example name="charts/Pie.vue" />

Pie charts work best with a small number of categories. Keep the legend visible because color alone should not carry the category meaning, and use a bar chart when precise comparisons matter more than part-to-whole shape.
