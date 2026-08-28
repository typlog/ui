<script lang="ts">
export type ChartAreaGradientColor = (_data: unknown, index: number) => string

export interface ChartAreaGradientSlotProps {
  /** SVG definitions to pass to the Unovis container's `svgDefs` prop. */
  svgDefs: string
  /** Unovis color accessor that resolves each area series to its gradient. */
  color: ChartAreaGradientColor
}
</script>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { injectChartContext } from './context'

const context = injectChartContext()
const instanceId = useId()
const gradients = computed(() => {
  return context.series.value.map(d => {
    const id = `ui-chart-area-${instanceId}-${d.index + 1}`
    const color = `var(--chart-${d.index + 1})`
    return { id, color }
  })
})
const svgDefs = computed(() => gradients.value.map(item => `
  <linearGradient id="${item.id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stop-color="${item.color}" stop-opacity="0.8" />
    <stop offset="95%" stop-color="${item.color}" stop-opacity="0.1" />
  </linearGradient>
`).join(''))
const areaColor: ChartAreaGradientColor = (_data, index) => {
  const gradient = gradients.value[index]
  return gradient ? `url(#${gradient.id})` : 'none'
}

defineSlots<{
  default: (props: ChartAreaGradientSlotProps) => any
}>()
</script>

<template>
  <slot :color="areaColor" :svg-defs="svgDefs"></slot>
</template>
