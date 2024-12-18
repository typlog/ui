<script lang="ts">
import type { ColorType } from './types'

export interface SeparatorProps {
  as?: string
  orientation?: 'horizontal' | 'vertical'
  size?: '1' | '2' | '3' | '4'
  color?: ColorType
}
</script>

<script setup lang="ts">
import { Primitive } from 'radix-vue'

const props = withDefaults(defineProps<SeparatorProps>(), {
  as: 'span',
  orientation: 'horizontal',
  color: 'gray',
})
</script>

<template>
  <Primitive
    :as="props.as"
    class="ui-Separator"
    :class="`r-size-${props.size}`"
    role="separator"
    :data-accent-color="props.color"
    :aria-orientation="props.orientation"
  />
</template>

<style>
.ui-Separator {
  display: block;
  box-sizing: border-box;
  background-color: var(--accent-a6);
}

.ui-Separator[aria-orientation="horizontal"] {
  width: var(--separator-size, auto);
  height: 1px;
}
.ui-Separator[aria-orientation="vertical"] {
  width: 1px;
  height: var(--separator-size, auto);
}

.ui-Separator:where(.r-size-1) {
  --separator-size: var(--space-4);
}
.ui-Separator:where(.r-size-2) {
  --separator-size: var(--space-6);
}
.ui-Separator:where(.r-size-3) {
  --separator-size: var(--space-9);
}
.ui-Separator:where(.r-size-4) {
  --separator-size: 100%;
}
</style>
