<script lang="ts">
import type { RadioGroupRootProps, RadioGroupRootEmits } from 'reka-ui'
import type { ColorType } from '../types'

export interface RadioCardsRootProps extends RadioGroupRootProps {
  /**
   * The visual variant of the radio group.
   * @default "surface"
   */
  variant?: 'surface' | 'classic'
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

const props = withDefaults(defineProps<RadioCardsRootProps>(), {
  size: '2',
  variant: 'surface',
})
const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'size', 'variant', 'highContrast'])
const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <RadioGroupRoot
    class="ui-RadioCardsRoot"
    :class="resetClass"
    :data-accent-color="props.color"
    v-bind="forwarded"
  >
    <slot></slot>
  </RadioGroupRoot>
</template>

<style>
.ui-RadioCardsRoot:where(.r-size-1) {
  --card-padding: var(--space-3);
  --card-border-radius: max(var(--radius-4), var(--radius-full));
}
.ui-RadioCardsRoot:where(.r-size-2) {
  --card-padding: var(--space-4);
  --card-border-radius: max(var(--radius-4), var(--radius-full));
}
.ui-RadioCardsRoot:where(.r-size-3) {
  --card-padding: var(--space-5);
  --card-border-radius: max(var(--radius-5), var(--radius-full));
}
</style>
