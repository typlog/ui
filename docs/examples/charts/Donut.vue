<script setup lang="ts">
import { Donut } from '@unovis/ts'
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import {
  ChartLegend,
  ChartRoot,
  ChartTooltip,
  ChartTooltipContent,
  createChartTooltipTemplate,
} from '@typlog/ui/charts'

const data = [
  { label: 'Direct', value: 46 },
  { label: 'Search', value: 31 },
  { label: 'Referral', value: 23 },
]
const config = Object.fromEntries(data.map(item => [
  item.label,
  { label: item.label },
]))
const tooltipContent = createChartTooltipTemplate(config, ChartTooltipContent, { hideLabel: true })
const tooltipTriggers = {
  [Donut.selectors.segment]: (arc: { data: { label: string; value: number } }) => (
    tooltipContent({ [arc.data.label]: arc.data.value })
  ),
}
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisSingleContainer v-if="mounted" :data="data" :height="220">
      <VisDonut
        :value="(item: { value: number }) => item.value"
        central-label="100%"
      />
      <ChartTooltip :triggers="tooltipTriggers" />
    </VisSingleContainer>
    <ChartLegend class="mt-3" />
  </ChartRoot>
</template>
