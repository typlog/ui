<script lang="ts">
import type {
  ToggleGroupRootProps as _ToggleGroupRootProps,
  ToggleGroupRootEmits,
} from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface ToggleGroupRootProps extends _ToggleGroupRootProps {
  /**
   * The visual variant to apply.
   * @default "solid"
   */
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
  /** Overrides the accent color inherited from the Theme. */
  color?: ColorType
  /**
   * Control the size of the toggle.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Uses a higher contrast color for the component. */
  highContrast?: boolean
  /** Overrides the radius inherited from the theme. */
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { ToggleGroupRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const emits = defineEmits<ToggleGroupRootEmits>()

const props = withDefaults(defineProps<ToggleGroupRootProps>(), {
  size: '2',
  variant: 'solid',
})

const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'size', 'variant', 'highContrast', 'radius'])
const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
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
@layer components {
  .ui-ToggleGroupRoot {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    flex-shrink: 0;
    height: var(--toggle-group-height);
  }
}
.ui-ToggleGroupRoot:where(.r-size-1) {
  font-size: var(--font-size-1);
  --toggle-radius: max(var(--radius-1), var(--radius-full));
  --toggle-group-height: var(--space-5);
  --toggle-group-soft-padding: 1px;
}
.ui-ToggleGroupRoot:where(.r-size-2) {
  font-size: var(--font-size-3);
  --toggle-radius: max(var(--radius-2), var(--radius-full));
  --toggle-group-height: var(--space-6);
  --toggle-group-soft-padding: 2px;
}
.ui-ToggleGroupRoot:where(.r-size-3) {
  font-size: var(--font-size-6);
  --toggle-radius: max(var(--radius-3), var(--radius-full));
  --toggle-group-height: var(--space-7);
  --toggle-group-soft-padding: 3px;
}
.ui-ToggleGroupRoot:where(.r-variant-solid),
.ui-ToggleGroupRoot:where(.r-variant-outline),
.ui-ToggleGroupRoot:where(.r-variant-surface) {
  border-radius: var(--toggle-radius);
  background-color: var(--color-panel-solid);
  box-shadow: var(--shadow-2);
  --toggle-item-size: var(--toggle-group-height);
}
.ui-ToggleGroupRoot:where(.r-variant-soft) {
  border-radius: var(--toggle-radius);
  background-color: var(--color-panel-translucent);
  box-shadow: var(--shadow-2);
  padding: var(--toggle-group-soft-padding);
  gap: var(--toggle-group-soft-padding);
  --toggle-item-size: calc(var(--toggle-group-height) - 2 * var(--toggle-group-soft-padding));
}
.ui-ToggleGroupRoot:where(.r-variant-ghost) {
  gap: calc(var(--space-1) / 2);
  --toggle-item-size: var(--toggle-group-height);
}
</style>
