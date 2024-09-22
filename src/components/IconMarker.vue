<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ColorType } from './types'

interface IconMarkerProps {
  color?: ColorType
  size?: number | string
  variant?: 'solid' | 'soft' | 'outline' | 'glow'
  icon: string
}
const props = withDefaults(defineProps<IconMarkerProps>(), {
  size: 1,
  variant: 'soft',
})
</script>

<template>
  <span
    class="ui-IconMarker"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-accent-color="props.color"
  >
    <Icon :icon="props.icon" />
  </span>
</template>

<style>
.ui-IconMarker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  border-radius: 9999px;
  box-sizing: border-box;
  user-select: none;
  cursor: default;
  background-color: var(--accent-a3);
  color: var(--accent-11);
  font-size: var(--icon-marker-size);
  padding: var(--icon-marker-padding);
}
.ui-IconMarker[data-size="1"] {
  --icon-marker-size: 10px;
  --icon-marker-padding: 2px;
}
.ui-IconMarker[data-size="2"] {
  --icon-marker-size: 12px;
  --icon-marker-padding: 3px;
}
.ui-IconMarker[data-size="3"] {
  --icon-marker-size: 14px;
  --icon-marker-padding: 4px;
}
.ui-IconMarker[data-variant="glow"] {
  box-shadow: 0 0 0 calc(var(--icon-marker-padding) - 1px) var(--accent-a2);
}
</style>
