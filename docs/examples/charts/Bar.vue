<script setup lang="ts">
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import { ChartLegend, ChartRoot, ChartTooltip, ChartCrosshair } from '@typlog/ui/charts'

interface BarPoint {
  month: string
  thisYear: number
  lastYear: number
}

const barData: BarPoint[] = [
  { month: 'Jan', thisYear: 120, lastYear: 92 },
  { month: 'Feb', thisYear: 152, lastYear: 110 },
  { month: 'Mar', thisYear: 180, lastYear: 128 },
  { month: 'Apr', thisYear: 220, lastYear: 160 },
]
const barConfig = {
  thisYear: { label: 'This year' },
  lastYear: { label: 'Last year' },
}
const barX = (_d: BarPoint, index: number) => index
const barY = [(d: BarPoint) => d.thisYear, (d: BarPoint) => d.lastYear]
const xTickFormat = (value: number) => barData[value]?.month ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="barConfig">
    <VisXYContainer v-if="mounted" :data="barData" :height="220">
      <VisGroupedBar :x="barX" :y="barY" :color="['var(--chart-1)', 'var(--chart-2)']" />
      <VisAxis
        type="x"
        :tick-format="xTickFormat"
        :tick-values="barData.map((_item, index) => index)"
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
      <ChartCrosshair />
    </VisXYContainer>
    <ChartLegend class="mt-3" />
  </ChartRoot>
</template>
