<script lang="ts">
type SpinnerIcon = '12-dots-scale-rotate' |
  '180-ring' |
  '180-ring-with-bg' |
  '270-ring' |
  '270-ring-with-bg' |
  '3-dots-bounce' |
  '3-dots-fade' |
  '3-dots-move' |
  '3-dots-rotate' |
  '3-dots-scale' |
  '3-dots-scale-middle' |
  '6-dots-rotate' |
  '6-dots-scale' |
  '6-dots-scale-middle' |
  '8-dots-rotate' |
  '90-ring' |
  '90-ring-with-bg' |
  'bars-fade' |
  'bars-rotate-fade' |
  'bars-scale' |
  'bars-scale-fade' |
  'bars-scale-middle' |
  'blocks-scale' |
  'blocks-shuffle-2' |
  'blocks-shuffle-3' |
  'blocks-wave' |
  'bouncing-ball' |
  'clock' |
  'dot-revolve' |
  'eclipse' |
  'eclipse-half' |
  'gooey-balls-1' |
  'gooey-balls-2' |
  'pulse' |
  'pulse-2' |
  'pulse-3' |
  'pulse-multiple' |
  'pulse-ring' |
  'pulse-rings-2' |
  'pulse-rings-3' |
  'pulse-rings-multiple' |
  'ring-resize' |
  'tadpole' |
  'wifi' |
  'wifi-fade' |
  'wind-toy'

interface SpinnerProps {
  icon?: SpinnerIcon
  size?: '1' | '2' | '3'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<SpinnerProps>(), {
  icon: '180-ring',
  size: '2',
})
const iconName = computed(() => {
  return `svg-spinners:${props.icon}`
})
</script>

<template>
  <Icon
    class="ui-Spinner"
    :class="`r-size-${size}`"
    :icon="iconName"
  />
</template>

<style>
.ui-Spinner {
  color: var(--gray-10);
}
.ui-Spinner:where(.r-size-1) {
  font-size: var(--space-3);
}
.ui-Spinner:where(.r-size-2) {
  font-size: var(--space-4);
}
.ui-Spinner:where(.r-size-3) {
  font-size: calc(1.25 * var(--space-4));
}
</style>
