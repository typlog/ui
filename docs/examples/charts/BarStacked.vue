<script setup lang="ts">
import { StackedBar } from '@unovis/ts'
import { VisAxis, VisStackedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartLegend,
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  month: string
  organic: number
  paid: number
  referral: number
}

const data: Point[] = [
  { month: 'Jan', organic: 84, paid: 48, referral: 24 },
  { month: 'Feb', organic: 96, paid: 56, referral: 31 },
  { month: 'Mar', organic: 112, paid: 62, referral: 38 },
  { month: 'Apr', organic: 128, paid: 74, referral: 42 },
]
const config = {
  month: { label: 'Month', role: 'x' },
  organic: { label: 'Organic' },
  paid: { label: 'Paid' },
  referral: { label: 'Referral' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = [
  (item: Point) => item.organic,
  (item: Point) => item.paid,
  (item: Point) => item.referral,
]
const xTickFormat = (value: number) => data[value]?.month ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="240">
      <VisStackedBar
        :x="x"
        :y="y"
        :rounded-corners="5"
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
      <ChartTooltip :targets="[StackedBar]" />
      <ChartCrosshair />
    </VisXYContainer>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
