<script setup lang="ts">
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import { ChartLegend, ChartRoot } from '@typlog/ui/charts'

interface Slice {
  plan: string
  accounts: number
}

const data: Slice[] = [
  { plan: 'Free', accounts: 62 },
  { plan: 'Pro', accounts: 28 },
  { plan: 'Business', accounts: 10 },
]
const config = Object.fromEntries(data.map(item => [item.plan, { label: item.plan }]))
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <div class="mx-auto max-w-72">
      <VisSingleContainer v-if="mounted" :data="data" :height="240">
        <VisDonut
          :value="(slice: Slice) => slice.accounts"
          :arc-width="12"
          :pad-angle="0.025"
          :corner-radius="6"
          central-label="100"
          central-sub-label="Accounts"
        />
      </VisSingleContainer>
    </div>
    <ChartLegend class="mt-3" align="center" />
  </ChartRoot>
</template>
