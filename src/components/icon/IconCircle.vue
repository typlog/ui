<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ColorType } from '../types'
import { buildPropsClass } from '../util'

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
const resetClass = buildPropsClass(props, ['size', 'variant'])
</script>

<template>
  <span
    class="ui-IconCircle"
    :class="resetClass"
    data-radius="full"
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
.ui-IconCircle:where(.r-size-1) {
  --icon-circle-size: 10px;
  --icon-circle-padding: 2px;
}
.ui-IconCircle:where(.r-size-2) {
  --icon-circle-size: 12px;
  --icon-circle-padding: 3px;
}
.ui-IconCircle:where(.r-size-3) {
  --icon-circle-size: 14px;
  --icon-circle-padding: 4px;
}
.ui-IconCircle:where(.r-variant-glow) {
  box-shadow: 0 0 0 calc(var(--icon-circle-padding) - 1px) var(--accent-a2);
}
</style>
