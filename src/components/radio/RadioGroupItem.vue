<script lang="ts">
import type { RadioGroupItemProps as RekaRadioGroupItemProps } from 'reka-ui'
import type { ColorType } from '../types'

export interface RadioGroupItemProps extends RekaRadioGroupItemProps {
  color?: ColorType
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupItem } from 'reka-ui'
import { injectRadioGroupRootContext } from './RadioGroupRoot.vue'
import { useForwardPropsWithout } from '../util'

const props = defineProps<RadioGroupItemProps>()

const forwarded = useForwardPropsWithout(props, ['color', 'size', 'variant', 'highContrast'])

const rootContext = injectRadioGroupRootContext()

const resetClass = computed(() => {
  const rv: string[] = [
    `r-size-${props.size || rootContext.size.value}`,
    `r-variant-${props.variant || rootContext.variant.value}`,
  ]
  if (props.highContrast) {
    rv.push('r-high-contrast')
  } else if (props.highContrast != false && rootContext.highContrast?.value) {
    rv.push('r-high-contrast')
  }
  return rv
})
</script>

<template>
  <label class="ui-RadioGroupItem">
    <RadioGroupItem
      class="ui-Radio"
      :class="resetClass"
      :data-accent-color="props.color || rootContext.color?.value"
      v-bind="forwarded"
    >
    </RadioGroupItem>
    <slot></slot>
  </label>
</template>

<style>
.ui-RadioGroupItem {
  display: flex;
  align-items: center;
  gap: .5em;
  width: fit-content;
}
</style>
