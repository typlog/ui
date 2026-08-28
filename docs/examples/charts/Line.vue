<script setup lang="ts">
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { ChartLegend, ChartRoot, type ChartConfig } from '@typlog/ui/charts'

interface Point {
  month: string
  revenue: number
  costs: number
}

const data: Point[] = [
  { month: 'Jan', revenue: 48, costs: 31 },
  { month: 'Feb', revenue: 62, costs: 38 },
  { month: 'Mar', revenue: 57, costs: 42 },
  { month: 'Apr', revenue: 76, costs: 47 },
  { month: 'May', revenue: 88, costs: 53 },
]
const config = {
  month: { label: 'Month', role: 'x' },
  revenue: { label: 'Revenue' },
  costs: { label: 'Costs' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = [(item: Point) => item.revenue, (item: Point) => item.costs]
const xTickFormat = (value: number) => data[value]?.month ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="240">
      <VisArea :x="x" :y="y" :color="['var(--chart-1)', 'var(--chart-2)']" :opacity="0.1" />
      <VisLine :x="x" :y="y" :color="['var(--chart-1)', 'var(--chart-2)']" :line-width="2" />
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
    </VisXYContainer>
    <ChartLegend class="mt-3" />
  </ChartRoot>
</template>
