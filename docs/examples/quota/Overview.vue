<script setup lang="ts">
import { Quota } from '@typlog/ui'
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div>
      <div class="mb-2 flex justify-between text-sm">
        <span>Storage</span>
        <span>42%</span>
      </div>
      <Quota :percent="42" color="blue" />
    </div>
    <div>
      <div class="mb-2 flex justify-between text-sm">
        <span>Bandwidth</span>
        <span>92%</span>
      </div>
      <Quota :percent="92" color="crimson" />
    </div>
  </div>
</template>
