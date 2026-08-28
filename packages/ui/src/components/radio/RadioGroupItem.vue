<script lang="ts">
import type { RadioGroupItemProps as RekaRadioGroupItemProps } from 'reka-ui'
import type { ColorType } from '../types'

export interface RadioGroupItemProps extends RekaRadioGroupItemProps {
  /** Overrides the accent color inherited from the RadioGroupRoot. */
  color?: ColorType
  /** Overrides the size inherited from the RadioGroupRoot. */
  size?: '1' | '2' | '3'
  /** Overrides the variant inherited from the RadioGroupRoot. */
  variant?: 'surface' | 'soft'
  /** Overrides the highContrast prop inherited from the RadioGroupRoot. */
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { RadioGroupItem } from 'reka-ui'
import { useForwardPropsWithout, buildPropsClass } from '../util'

const props = defineProps<RadioGroupItemProps>()
const forwarded = useForwardPropsWithout(props, ['color', 'size', 'variant', 'highContrast'])
const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <label class="ui-RadioGroupItem">
    <RadioGroupItem
      class="ui-RadioBase ui-RadioGroupItemIndicator"
      :class="resetClass"
      :data-accent-color="props.color"
      v-bind="forwarded"
    >
    </RadioGroupItem>
    <slot></slot>
  </label>
</template>

<style src="./style.css"></style>

<style>
@layer components {
  .ui-RadioGroupItem {
    display: inline-flex;
    align-items: center;
    gap: .5em;
    width: fit-content;
  }
}
</style>
