<script lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { RadioGroupItem } from 'reka-ui'
import { injectRadioGroupRootContext } from './RadioGroupRoot.vue'

const props = defineProps<RadioGroupItemProps>()
const forwarded = useForwardProps(props)
const rootContext = injectRadioGroupRootContext()

const resetClass = computed(() => {
  const rv: string[] = [
    `r-size-${rootContext.size.value}`,
    `r-variant-${rootContext.variant.value}`,
  ]
  if (rootContext.highContrast?.value) {
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
      :data-accent-color="rootContext.color?.value"
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
