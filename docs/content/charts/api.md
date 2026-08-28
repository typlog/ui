---
title: Chart API Reference
description: Public props and slots for Typlog chart adapters.
status: alpha
---

## ChartRoot

<PropsTable name="ChartRoot" />

`ChartRoot` exposes a scoped default slot, `{ mounted }`, which is `false` during SSR and the initial render and becomes `true` after mount. Render client-only Unovis containers with `v-if="mounted"` inside this slot. Standard DOM and ARIA attributes are forwarded to the root primitive.

## ChartLegend

<PropsTable name="ChartLegend" />

## ChartTooltip

<PropsTable name="ChartTooltip" />

## ChartCrosshair

<PropsTable name="ChartCrosshair" />

## ChartTooltipContent

<PropsTable name="ChartTooltipContent" />
