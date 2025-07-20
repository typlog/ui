<script lang="ts">
const ICON_MAP: Record<string, string> = {
  'Overview': 'lucide:rocket',
  'Components': 'lucide:component',
  'Addons': 'lucide:blocks',
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '#components'

const props = defineProps<{text?: string}>()
const icon = computed(() => {
  if (!props.text) {
    return null
  }
  return ICON_MAP[props.text]
})
</script>

<template>
  <Icon v-if="icon" :icon="icon" />
</template>
