<script setup lang="ts">
import { VisArea, VisAxis, VisXYContainer } from '@unovis/vue'
import {
  ChartAreaGradient,
  ChartCrosshair,
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  hour: string
  requests: number
}

const data: Point[] = [
  { hour: '00:00', requests: 18 },
  { hour: '04:00', requests: 12 },
  { hour: '08:00', requests: 38 },
  { hour: '12:00', requests: 64 },
  { hour: '16:00', requests: 52 },
  { hour: '20:00', requests: 31 },
]
const config = {
  hour: { label: 'Time', role: 'x' },
  requests: { label: 'Requests', color: 'var(--violet-9)' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = (item: Point) => item.requests
const xTickFormat = (value: number) => data[value]?.hour ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <ChartAreaGradient v-slot="{ color, svgDefs }">
      <VisXYContainer v-if="mounted" :data="data" :height="220" :svg-defs="svgDefs">
        <VisArea
          :x="x"
          :y="y"
          :color="color"
          :opacity="0.4"
          :line="true"
          :line-width="1"
        />
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
    </ChartAreaGradient>
  </ChartRoot>
</template>
