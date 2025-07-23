<script lang="ts">
import type { ToggleProps as _ToggleProps, ToggleEmits } from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface ToggleProps extends _ToggleProps {
  /**
   * The visual variant to apply.
   * @default "soft"
   */
  variant?: 'solid' | 'soft' | 'ghost'
  /** Overrides the accent color inherited from the Theme. */
  color?: ColorType
  /** Overrides the radius inherited from the theme. */
  radius?: RadiusType
  /**
   * Control the size of the toggle.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Uses a higher contrast color for the component. */
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { Toggle } from 'reka-ui'
import { extractForwardPropsEmits } from '../util'

const emits = defineEmits<ToggleEmits>()

const props = withDefaults(defineProps<ToggleProps>(), {
  size: '2',
  variant: 'soft',
})
const [forwarded, resetClass] = extractForwardPropsEmits(props, emits, [
  'color', 'size', 'variant', 'highContrast', 'radius',
])
</script>

<template>
  <Toggle
    v-bind="forwarded"
    class="ui-Toggle"
    :class="resetClass"
    :data-accent-color="props.color"
    :data-radius="props.radius"
  >
    <slot></slot>
  </Toggle>
</template>

<style>
.ui-Toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  flex-shrink: 0;
  width: var(--toggle-size);
  height: var(--toggle-size);
}
.ui-Toggle:where(.r-size-1) {
  border-radius: max(var(--radius-1), var(--radius-full));
  --toggle-size: var(--space-5);
}
.ui-Toggle:where(.r-size-2) {
  border-radius: max(var(--radius-2), var(--radius-full));
  --toggle-size: var(--space-6);
}
.ui-Toggle:where(.r-size-3) {
  border-radius: max(var(--radius-3), var(--radius-full));
  --toggle-size: var(--space-7);
}

/** soft */
.ui-Toggle:where(.r-variant-soft) {
  background-color: var(--color-panel-translucent);
  box-shadow: var(--shadow-2);
}
@media (hover: hover) {
  .ui-Toggle:where(.r-variant-soft):where(:hover) {
    background-color: var(--accent-a2);
  }
}
.ui-Toggle:where(.r-variant-soft):where(:focus-visible) {
  outline: 2px solid var(--accent-8);
  outline-offset: -1px;
}
.ui-Toggle:where(.r-variant-soft):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}
.ui-Toggle:where(.r-variant-soft):where([data-state="on"]) {
  background-color: var(--accent-a3);
  box-shadow: var(--shadow-1);
}

/** solid & ghost*/
.ui-Toggle:where(.r-variant-solid) {
  background-color: var(--color-panel-solid);
  box-shadow: var(--shadow-2);
}

@media (hover: hover) {
  .ui-Toggle:where(.r-variant-solid, .r-variant-ghost):where(:hover) {
    background-color: var(--accent-a3);
  }
}
.ui-Toggle:where(.r-variant-solid, .r-variant-ghost):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
.ui-Toggle:where(.r-variant-solid):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}
.ui-Toggle:where(.r-variant-ghost):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: transparent;
}
.ui-Toggle:where(.r-variant-solid):where([data-state="on"]) {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
  box-shadow: var(--shadow-1);
}
.ui-Toggle:where(.r-variant-ghost):where([data-state="on"]) {
  background-color: var(--accent-a3);
  box-shadow: var(--shadow-1);
}
.ui-Toggle:where(.r-variant-solid, .r-variant-ghost):where(.r-high-contrast):where([data-state="on"]) {
  background-color: var(--accent-12);
  color: var(--gray-1);
}
</style>
