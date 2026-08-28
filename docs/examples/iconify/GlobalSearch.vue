<script setup lang="ts">
import { ref } from 'vue'
import { IconGrid } from '@typlog/ui/addons'

const selectedIcon = ref('')
const query = ref('weather')
</script>

<template>
  <div class="w-full max-w-xl space-y-3">
    <IconGrid
      v-model="selectedIcon"
      v-model:query="query"
      :height="280"
    />
    <p class="text-sm text-gray-11">
      Selected: {{ selectedIcon || 'None' }}
    </p>
  </div>
</template>
