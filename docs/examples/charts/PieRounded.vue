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
  source: string
  sessions: number
}

const data: Slice[] = [
  { source: 'Product', sessions: 42 },
  { source: 'Docs', sessions: 28 },
  { source: 'Blog', sessions: 19 },
  { source: 'Community', sessions: 11 },
]
const config = Object.fromEntries(data.map(item => [item.source, { label: item.source }]))
const tooltipContent = createChartTooltipTemplate(config, ChartTooltipContent, { hideLabel: true })
const tooltipTriggers = {
  [Donut.selectors.segment]: (arc: { data: Slice }) => (
    tooltipContent({ [arc.data.source]: arc.data.sessions })
  ),
}
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <div class="mx-auto max-w-72">
      <VisSingleContainer v-if="mounted" :data="data" :height="260">
        <VisDonut
          :value="(slice: Slice) => slice.sessions"
          :arc-width="0"
          :pad-angle="0.035"
          :corner-radius="8"
        />
        <ChartTooltip :triggers="tooltipTriggers" />
      </VisSingleContainer>
    </div>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
