<script setup lang="ts">
import { ChartLegend, ChartRoot } from '@typlog/ui/charts'

const config = {
  revenue: { label: 'Revenue' },
  costs: { label: 'Costs' },
  profit: { label: 'Profit', color: 'var(--green-9)' },
}
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <ChartRoot :config="config">
      <ChartLegend align="center" />
    </ChartRoot>
    <ChartRoot :config="config">
      <ChartLegend orientation="vertical" />
    </ChartRoot>
  </div>
</template>
