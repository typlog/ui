<script setup lang="ts">
import { VisLine, VisXYContainer } from '@unovis/vue'
import {
  ChartCrosshair,
  ChartRoot,
  ChartTooltip,
} from '@typlog/ui/charts'

interface Point {
  value: number
}

const data: Point[] = [{ value: 28 }, { value: 42 }, { value: 35 }, { value: 58 }, { value: 64 }]
const config = { value: { label: 'Visitors' } }
const x = (_item: Point, index: number) => index
const y = (item: Point) => item.value
const lineContentProps = {
  indicator: 'line' as const,
  labelFormatter: (value: string | number | Date) => `Day ${Number(value) + 1}`,
}
const noIndicatorContentProps = {
  indicator: 'none' as const,
  labelFormatter: (value: string | number | Date) => `Day ${Number(value) + 1}`,
}
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <ChartRoot v-slot="{ mounted }" :config="config">
      <VisXYContainer v-if="mounted" :data="data" :height="180">
        <VisLine :x="x" :y="y" color="var(--chart-1)" />
        <ChartTooltip />
        <ChartCrosshair :content-props="lineContentProps" />
      </VisXYContainer>
    </ChartRoot>
    <ChartRoot v-slot="{ mounted }" :config="config">
      <VisXYContainer v-if="mounted" :data="data" :height="180">
        <VisLine :x="x" :y="y" color="var(--chart-1)" />
        <ChartTooltip />
        <ChartCrosshair :content-props="noIndicatorContentProps" />
      </VisXYContainer>
    </ChartRoot>
  </div>
</template>
