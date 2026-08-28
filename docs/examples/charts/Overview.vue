<script setup lang="ts">
import { ref } from 'vue'
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { ChartCrosshair, ChartLegend, ChartRoot, ChartTooltip, type ChartConfig } from '#charts'

interface Point {
  month: string
  visitors: number
  signups: number
}

const data = ref<Point[]>([
  { month: 'Jan', visitors: 320, signups: 120 },
  { month: 'Feb', visitors: 410, signups: 160 },
  { month: 'Mar', visitors: 380, signups: 145 },
  { month: 'Apr', visitors: 520, signups: 210 },
  { month: 'May', visitors: 610, signups: 260 },
  { month: 'Jun', visitors: 720, signups: 305 },
])
const config = {
  month: { label: 'Month', role: 'x' },
  visitors: { label: 'Visitors' },
  signups: { label: 'Signups' },
} satisfies ChartConfig
const x = (_d: Point, index: number) => index
const y = [(d: Point) => d.visitors, (d: Point) => d.signups]
const xTickFormat = (value: number) => data.value[value]?.month ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="260">
      <VisArea :x="x" :y="y" :color="['var(--chart-1)', 'var(--chart-2)']" :opacity="0.12" />
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
      <ChartTooltip />
      <ChartCrosshair color="transparent" />
    </VisXYContainer>
    <ChartLegend class="mt-3" />
  </ChartRoot>
</template>
