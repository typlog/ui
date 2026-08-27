<script setup lang="ts">
import { Spinner } from '#components'
</script>

<template>
  <div class="flex flex-wrap items-end gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner color="gray" aria-label="Loading, gray" />
      <span class="text-sm text-gray-11">Gray</span>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner color="blue" aria-label="Loading, blue" />
      <span class="text-sm text-gray-11">Blue</span>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner color="green" aria-label="Loading, green" />
      <span class="text-sm text-gray-11">Green</span>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner color="amber" aria-label="Loading, amber" />
      <span class="text-sm text-gray-11">Amber</span>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner color="red" aria-label="Loading, red" />
      <span class="text-sm text-gray-11">Red</span>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner color="violet" aria-label="Loading, violet" />
      <span class="text-sm text-gray-11">Violet</span>
    </div>
  </div>
</template>
