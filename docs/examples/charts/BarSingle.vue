<script setup lang="ts">
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  channel: string
  conversions: number
}

const data: Point[] = [
  { channel: 'Direct', conversions: 182 },
  { channel: 'Search', conversions: 246 },
  { channel: 'Social', conversions: 138 },
  { channel: 'Email', conversions: 204 },
]
const config = {
  channel: { label: 'Channel', role: 'x' },
  conversions: { label: 'Conversions', color: 'var(--green-9)' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = (item: Point) => item.conversions
const xTickFormat = (value: number) => data[value]?.channel ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="220">
      <VisGroupedBar :x="x" :y="y" :rounded-corners="6" />
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
