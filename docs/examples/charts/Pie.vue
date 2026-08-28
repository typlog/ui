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

interface Slice {
  browser: string
  visitors: number
}

const data: Slice[] = [
  { browser: 'chrome', visitors: 275 },
  { browser: 'safari', visitors: 200 },
  { browser: 'firefox', visitors: 187 },
  { browser: 'edge', visitors: 173 },
  { browser: 'other', visitors: 90 },
]
const config = {
  chrome: { label: 'Chrome' },
  safari: { label: 'Safari' },
  firefox: { label: 'Firefox' },
  edge: { label: 'Edge' },
  other: { label: 'Other' },
}
const tooltipContent = createChartTooltipTemplate(config, ChartTooltipContent, { hideLabel: true })
const tooltipTriggers = {
  [Donut.selectors.segment]: (arc: { data: Slice }) => (
    tooltipContent?.({ [arc.data.browser]: arc.data.visitors })
  ),
}
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <div class="mx-auto max-w-72">
      <VisSingleContainer v-if="mounted" :data="data" :height="260">
        <VisDonut
          :value="(slice: Slice) => slice.visitors"
          :color="(_slice: Slice, index: number) => `var(--chart-${index + 1})`"
          :arc-width="0"
        />
        <ChartTooltip :triggers="tooltipTriggers" />
      </VisSingleContainer>
    </div>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
