<script lang="ts">
import type { RadioGroupItemProps } from 'radix-vue'
</script>

<script setup lang="ts">
import { useForwardExpose, useForwardProps } from 'radix-vue'
import { RadioGroupItem } from 'radix-vue'
import { injectRadioGroupRootContext } from './RadioGroupRoot.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RadioGroupItemProps>()
const forwarded = useForwardProps(props)

useForwardExpose()

const rootContext = injectRadioGroupRootContext()
</script>

<template>
  <RadioGroupItem
    class="ui-Radio"
    :data-accent-color="rootContext.color?.value"
    :data-size="rootContext.size.value"
    :data-variant="rootContext.variant.value"
    :data-high-contrast="rootContext.highContrast?.value"
    v-bind="{...$attrs, ...forwarded}"
  >
    <slot></slot>
  </RadioGroupItem>
</template>
