---
title: Line Chart
description: Compose line and area series with numeric or date domains.
status: alpha
---

Use `VisXYContainer` with `VisLine` and optional `VisArea` primitives. Unovis domains should be numeric or date based; for categorical data, map rows to numeric indexes and format the x-axis ticks back to labels.

<Example name="charts/Line.vue" />

`ChartRoot` owns presentation metadata and theme variables. Data, scales, accessors, animation, and rendering remain Unovis responsibilities.
