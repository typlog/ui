<script lang="ts">
import type { RadioGroupRootProps as RekaRadioGroupRootProps, RadioGroupRootEmits } from 'reka-ui'
import type { ColorType } from '../types'

export interface RadioGroupRootProps extends RekaRadioGroupRootProps {
  /**
   * The visual variant of the radio group.
   * @default "surface"
   */
  variant?: 'surface' | 'soft'
  /**
   * Control the size of the radio group.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Overrides the accent color inherited from the ThemeProvider. */
  color?: ColorType
  /** Uses a higher contrast color for the component. */
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const emits = defineEmits<RadioGroupRootEmits>()

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  size: '2',
  variant: 'surface',
})
const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'size', 'variant', 'highContrast'])
const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <RadioGroupRoot
    class="ui-RadioGroupRoot"
    :class="resetClass"
    :data-accent-color="props.color"
    v-bind="forwarded"
  >
    <slot></slot>
  </RadioGroupRoot>
</template>

<style>
.ui-RadioGroupRoot:where(.r-size-1) {
  --radio-size: calc(var(--space-4) * 0.875);
}
.ui-RadioGroupRoot:where(.r-size-2) {
  --radio-size: var(--space-4);
}
.ui-RadioGroupRoot:where(.r-size-3) {
  --radio-size: calc(var(--space-4) * 1.25);
}
</style>
