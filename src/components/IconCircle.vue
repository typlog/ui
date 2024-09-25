<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ColorType } from './types'

export interface IconCircleProps {
  color?: ColorType
  size?: number | string
  variant?: 'solid' | 'soft' | 'outline' | 'glow'
  icon: string
}
const props = withDefaults(defineProps<IconCircleProps>(), {
  size: 1,
  variant: 'soft',
})
</script>

<template>
  <span
    class="ui-IconCircle"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-accent-color="props.color"
  >
    <Icon :icon="props.icon" />
  </span>
</template>

<style>
.ui-IconCircle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
  box-sizing: border-box;
  user-select: none;
  cursor: default;
  background-color: var(--accent-a3);
  color: var(--accent-11);
  font-size: var(--icon-circle-size);
  padding: var(--icon-circle-padding);
}
.ui-IconCircle[data-size="1"] {
  --icon-circle-size: 10px;
  --icon-circle-padding: 2px;
}
.ui-IconCircle[data-size="2"] {
  --icon-circle-size: 12px;
  --icon-circle-padding: 3px;
}
.ui-IconCircle[data-size="3"] {
  --icon-circle-size: 14px;
  --icon-circle-padding: 4px;
}
.ui-IconCircle[data-variant="glow"] {
  box-shadow: 0 0 0 calc(var(--icon-circle-padding) - 1px) var(--accent-a2);
}
</style>
