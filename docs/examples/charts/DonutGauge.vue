<script setup lang="ts">
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import { ChartLegend, ChartRoot } from '@typlog/ui/charts'

interface Slice {
  status: string
  value: number
}

const data: Slice[] = [
  { status: 'Used', value: 72 },
  { status: 'Available', value: 28 },
]
const config = {
  Used: { label: 'Used', color: 'var(--green-9)' },
  Available: { label: 'Available', color: 'var(--gray-6)' },
}
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <div class="mx-auto max-w-72">
      <VisSingleContainer v-if="mounted" :data="data" :height="190">
        <VisDonut
          :value="(slice: Slice) => slice.value"
          :arc-width="22"
          :angle-range="[-Math.PI / 2, Math.PI / 2]"
          :background-angle-range="[-Math.PI / 2, Math.PI / 2]"
          :corner-radius="8"
          central-label="72%"
          central-sub-label="Capacity used"
          :central-label-offset-y="24"
        />
      </VisSingleContainer>
    </div>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
