<script setup lang="ts">
import {
  Empty,
  EmptyTitle,
} from '#components'

const radii = ['none', 'small', 'medium', 'large', 'full'] as const
</script>

<template>
  <div class="flex flex-col w-full gap-4">
    <Empty
      v-for="radius in radii"
      :key="radius"
      size="1"
      :radius="radius"
      class="min-w-0 min-h-20 border border-gray-7 bg-gray-2"
    >
      <EmptyTitle>{{ radius }}</EmptyTitle>
    </Empty>
  </div>
</template>
