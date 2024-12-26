<script lang="ts">
import type {
  ToggleGroupRootProps as _ToggleGroupRootProps,
  ToggleGroupRootEmits,
} from 'reka-ui'
import type { ColorType, RadiusType } from './types'

export interface ToggleGroupRootProps extends _ToggleGroupRootProps {
  color?: ColorType
  variant?: 'solid' | 'soft' | 'ghost'
  size?: '1' | '2' | '3'
  highContrast?: boolean
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { ToggleGroupRoot } from 'reka-ui'

import { extractForwardPropsEmits } from './util'

const emits = defineEmits<ToggleGroupRootEmits>()

const props = withDefaults(defineProps<ToggleGroupRootProps>(), {
  size: '2',
  variant: 'soft',
})
const [forwarded, resetClass] = extractForwardPropsEmits(props, emits, [
  'color', 'size', 'variant', 'highContrast', 'radius',
])
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    class="ui-ToggleGroupRoot"
    :class="resetClass"
    :data-accent-color="props.color"
    :data-radius="props.radius"
  >
    <slot></slot>
  </ToggleGroupRoot>
</template>

<style>
.ui-ToggleGroupRoot {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  flex-shrink: 0;
  height: var(--toggle-size);
}
.ui-ToggleGroupRoot:where(.r-size-1) {
  --toggle-radius: max(var(--radius-1), var(--radius-full));
  --toggle-size: var(--space-5);
}
.ui-ToggleGroupRoot:where(.r-size-2) {
  --toggle-radius: max(var(--radius-2), var(--radius-full));
  --toggle-size: var(--space-6);
}
.ui-ToggleGroupRoot:where(.r-size-3) {
  --toggle-radius: max(var(--radius-3), var(--radius-full));
  --toggle-size: var(--space-7);
}
.ui-ToggleGroupRoot:where(.r-variant-solid) {
  border-radius: var(--toggle-radius);
  background-color: var(--color-panel-solid);
  box-shadow: var(--shadow-2);
}
.ui-ToggleGroupRoot:where(.r-variant-soft) {
  border-radius: var(--toggle-radius);
  background-color: var(--color-panel-translucent);
  box-shadow: var(--shadow-2);
}
.ui-ToggleGroupRoot:where(.r-variant-ghost) {
  gap: calc(var(--space-1) / 2);
}
</style>
