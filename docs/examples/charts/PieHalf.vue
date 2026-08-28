<script setup lang="ts">
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import { ChartLegend, ChartRoot } from '@typlog/ui/charts'

interface Slice {
  status: string
  value: number
}

const data: Slice[] = [
  { status: 'Complete', value: 58 },
  { status: 'In progress', value: 27 },
  { status: 'Blocked', value: 15 },
]
const config = Object.fromEntries(data.map(item => [item.status, { label: item.status }]))
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <div class="mx-auto max-w-72">
      <VisSingleContainer v-if="mounted" :data="data" :height="190">
        <VisDonut
          :value="(slice: Slice) => slice.value"
          :arc-width="0"
          :angle-range="[-Math.PI / 2, Math.PI / 2]"
          :pad-angle="0.025"
        />
      </VisSingleContainer>
    </div>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
