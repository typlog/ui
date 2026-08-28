<script setup lang="ts">
import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  day: string
  activeUsers: number
}

const data: Point[] = [
  { day: 'Mon', activeUsers: 1280 },
  { day: 'Tue', activeUsers: 1460 },
  { day: 'Wed', activeUsers: 1390 },
  { day: 'Thu', activeUsers: 1710 },
  { day: 'Fri', activeUsers: 1890 },
  { day: 'Sat', activeUsers: 1760 },
  { day: 'Sun', activeUsers: 2040 },
]
const config = {
  day: { label: 'Day', role: 'x' },
  activeUsers: { label: 'Active users', color: 'var(--cyan-9)' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = (item: Point) => item.activeUsers
const xTickFormat = (value: number) => data[value]?.day ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="220">
      <VisLine :x="x" :y="y" :line-width="3" />
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
  </ChartRoot>
</template>
