<script setup lang="ts">
import RevenueIcon from '~icons/ri/money-dollar-circle-line'
import { VisLine, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartRoot,
  ChartTooltip,
} from '#charts'

interface Point {
  revenue: number
}

const data: Point[] = [{ revenue: 2800 }, { revenue: 4200 }, { revenue: 3500 }, { revenue: 5800 }]
const config = { revenue: { label: 'Revenue', icon: RevenueIcon } }
const contentProps = {
  labelFormatter: (value: string | number | Date) => `Week ${Number(value) + 1}`,
  valueFormatter: (value: unknown) => `$${Number(value).toLocaleString()}`,
}
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer v-if="mounted" :data="data" :height="200">
      <VisLine :x="(_item: Point, index: number) => index" :y="(item: Point) => item.revenue" color="var(--chart-1)" />
      <ChartTooltip />
      <ChartCrosshair :content-props="contentProps" color="transparent" />
    </VisXYContainer>
  </ChartRoot>
</template>
