<script setup lang="ts">
import { Spinner } from '@typlog/ui'
</script>

<template>
  <div class="flex flex-wrap items-end gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner
        size="1"
        aria-label="Loading, size 1"
      />
      <span class="text-sm text-gray-11">Size 1</span>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner
        size="2"
        aria-label="Loading, size 2"
      />
      <span class="text-sm text-gray-11">Size 2</span>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <Spinner
        size="3"
        aria-label="Loading, size 3"
      />
      <span class="text-sm text-gray-11">Size 3</span>
    </div>
  </div>
</template>
