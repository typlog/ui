<script setup lang="ts">
import { ref } from 'vue'
import { IconGrid } from '#addons'

const selectedIcon = ref('')
const query = ref('shape')
</script>

<template>
  <IconGrid
    v-model="selectedIcon"
    v-model:query="query"
    class="w-full max-w-xl overflow-hidden rounded-lg border border-gray-a4"
    :collections="['lucide', 'simple-icons']"
    :height="280"
    :ui="{
      header: 'bg-gray-a2 p-4 pb-0',
      tabs: 'mx-4',
      viewport: 'bg-gray-a2 p-4',
      cell: 'rounded-full',
    }"
  />
</template>
