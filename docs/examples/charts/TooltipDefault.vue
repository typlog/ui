<script setup lang="ts">
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  day: string
  desktop: number
  mobile: number
}

const data: Point[] = [
  { day: 'Mon', desktop: 186, mobile: 80 },
  { day: 'Tue', desktop: 305, mobile: 200 },
  { day: 'Wed', desktop: 237, mobile: 120 },
  { day: 'Thu', desktop: 173, mobile: 190 },
  { day: 'Fri', desktop: 209, mobile: 130 },
]
const config = {
  day: { label: 'Day', role: 'x' },
  desktop: { label: 'Desktop' },
  mobile: { label: 'Mobile' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = [(item: Point) => item.desktop, (item: Point) => item.mobile]
const xTickFormat = (value: number) => data[value]?.day ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="240">
      <VisGroupedBar :x="x" :y="y" :color="['var(--chart-1)', 'var(--chart-2)']" />
      <VisAxis
        type="x"
        :tick-format="xTickFormat"
        :tick-values="data.map((_item, index) => index)"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
      />
      <VisAxis
        type="y"
        :tick-format="() => ''"
        :tick-line="false"
        :domain-line="false"
        :grid-line="true"
      />
      <ChartTooltip />
      <ChartCrosshair color="transparent" />
    </VisXYContainer>
  </ChartRoot>
</template>
