<script setup lang="ts">
import { Empty, EmptyDescription, EmptyTitle, Skeleton } from '#components'
import { ChartRoot } from '#charts'

const config = { value: { label: 'Value' } }
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <ChartRoot :config="config">
      <div class="grid gap-3 py-8">
        <Skeleton class="h-3 w-full" />
        <Skeleton class="h-48 w-full" />
      </div>
    </ChartRoot>
    <ChartRoot :config="config">
      <Empty>
        <EmptyTitle>No activity yet</EmptyTitle>
        <EmptyDescription>Chart data will appear here once events arrive.</EmptyDescription>
      </Empty>
    </ChartRoot>
  </div>
</template>
