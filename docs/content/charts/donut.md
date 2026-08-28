---
title: Donut Chart
description: Build single-container donut and radial summaries.
status: alpha
---

Donut charts reserve the center for a total or short summary. Place `VisDonut` inside `VisSingleContainer`; `ChartRoot` still supplies palette variables, tooltip configuration, and legend metadata.

## Summary

Use the central label for a concise total and keep the surrounding legend visible. Segment tooltips can reuse `ChartTooltipContent` through `createChartTooltipTemplate`.

<Example name="charts/Donut.vue" />

## Thin ring

A thin ring gives more visual weight to the central number. Rounded corners and slight padding work best with a small number of segments.

<Example name="charts/DonutThin.vue" />

## Progress gauge

A half donut can present progress against a fixed total. Include both used and available segments so the geometry still represents the complete denominator.

<Example name="charts/DonutGauge.vue" />

Do not use the central label for a second, unrelated metric. It should summarize the ring or provide the total represented by its segments.
