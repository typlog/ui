<script setup lang="ts">
import { Skeleton } from '#components'

const radii = ['none', 'small', 'medium', 'large', 'full'] as const
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
    <div
      v-for="radius in radii"
      :key="radius"
      class="flex min-w-0 flex-col items-center gap-2"
    >
      <Skeleton
        :radius="radius"
        class="h-8 w-full"
      />
      <span class="text-sm text-gray-11">{{ radius }}</span>
    </div>
  </div>
</template>
