<script setup lang="ts">
import { VisArea, VisAxis, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartLegend,
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  quarter: string
  newUsers: number
  returningUsers: number
}

const data: Point[] = [
  { quarter: 'Q1', newUsers: 36, returningUsers: 22 },
  { quarter: 'Q2', newUsers: 48, returningUsers: 29 },
  { quarter: 'Q3', newUsers: 55, returningUsers: 37 },
  { quarter: 'Q4', newUsers: 68, returningUsers: 43 },
]
const config = {
  quarter: { label: 'Quarter', role: 'x' },
  newUsers: { label: 'New users' },
  returningUsers: { label: 'Returning users' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = [(item: Point) => item.newUsers, (item: Point) => item.returningUsers]
const xTickFormat = (value: number) => data[value]?.quarter ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="220">
      <VisArea
        :x="x"
        :y="y"
        :opacity="0.22"
        :line="true"
        :line-width="2"
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
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
