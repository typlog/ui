<script setup lang="ts">
import { ref } from 'vue'
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartLegend,
  ChartRoot,
  ChartTooltip,
  ChartAreaGradient,
  type ChartConfig,
} from '@typlog/ui/charts'

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
const yArea = [(d: Point) => d.visitors, (d: Point) => d.signups]
const yLine = [(d: Point) => d.visitors, (d: Point) => d.visitors + d.signups]
const xTickFormat = (value: number) => data.value[value]?.month ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <ChartAreaGradient v-slot="{ color, svgDefs }">
      <VisXYContainer v-if="mounted" :data="data" :height="260" :svg-defs="svgDefs">
        <VisArea :x="x" :y="yArea" :color="color" :opacity="0.4" />
        <VisLine :x="x" :y="yLine" :line-width="1" />
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
          :tick-line="false"
          :domain-line="false"
          :grid-line="true"
        />
        <ChartTooltip />
        <ChartCrosshair />
      </VisXYContainer>
    </ChartAreaGradient>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
