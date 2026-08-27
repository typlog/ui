<script setup lang="ts">
import { ref } from 'vue'
import { IconGrid } from '#addons'

const selectedIcon = ref('')
const activeCollection = ref('')
</script>

<template>
  <div class="w-full max-w-xl space-y-3">
    <IconGrid
      v-model="selectedIcon"
      v-model:active-collection="activeCollection"
      :collections="['lucide', 'simple-icons']"
      :height="280"
    />
    <p class="text-sm text-gray-11">
      Selected: {{ selectedIcon || 'None' }}
    </p>
  </div>
</template>
