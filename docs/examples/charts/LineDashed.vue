<script setup lang="ts">
import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartLegend,
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  week: string
  actual: number
  target: number
}

const data: Point[] = [
  { week: 'W1', actual: 42, target: 48 },
  { week: 'W2', actual: 51, target: 54 },
  { week: 'W3', actual: 58, target: 60 },
  { week: 'W4', actual: 68, target: 66 },
  { week: 'W5', actual: 73, target: 72 },
  { week: 'W6', actual: 81, target: 78 },
]
const config = {
  week: { label: 'Week', role: 'x' },
  actual: { label: 'Actual' },
  target: { label: 'Target', color: 'var(--gray-9)' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = [(item: Point) => item.actual, (item: Point) => item.target]
const dash = (_data: Point[], index: number) => index === 1 ? [6, 5] : []
const xTickFormat = (value: number) => data[value]?.week ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="220">
      <VisLine :x="x" :y="y" :line-dash-array="dash" :line-width="2" />
      <VisAxis
        type="x"
        :tick-format="xTickFormat"
        :tick-values="data.map((_item, index) => index)"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
      />
      <VisAxis type="y" :tick-format="() => ''" :tick-line="false" :domain-line="false" />
      <ChartTooltip />
      <ChartCrosshair />
    </VisXYContainer>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
