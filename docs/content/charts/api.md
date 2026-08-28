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

`ChartTooltip` can generate Unovis triggers from `targets`. Supported primitives are `Donut`, `GroupedBar`, and `StackedBar`; pass a descriptor with `primitive` and an optional `payload` mapper when the default data mapping is not enough. Explicit `triggers` override generated triggers for the same selector.

## ChartCrosshair

<PropsTable name="ChartCrosshair" />

## ChartTooltipContent

<PropsTable name="ChartTooltipContent" />
