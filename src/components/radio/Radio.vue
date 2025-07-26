<script lang="ts">
import type { ColorType } from '../types'

export interface RadioProps {
  /**
   * The visual variant to apply.
   * @default "surface"
   */
  variant?: 'surface' | 'soft'
  /** Overrides the accent color inherited from the Theme. */
  color?: ColorType
  /**
   * Control the size of the radio.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Uses a higher contrast color for the component. */
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<RadioProps>(), {
  size: '2',
  variant: 'surface',
})

const [modelValue, modifiers] = defineModel<any>({
  default: '',
  set (value) {
    if (modifiers.number) {
      return Number(value)
    }
    if (modifiers.trim) {
      return value.trim()
    }
    return value
  },
})

const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <input
    v-model="modelValue"
    class="ui-RadioBase ui-Radio"
    :class="resetClass"
    type="radio"
    :data-accent-color="props.color"
  >
</template>

<style src="./style.css"></style>

<style>
.ui-Radio {
  appearance: none;
}
</style>
