<script lang="ts">
import { computed } from 'vue'
import { useForwardExpose, useForwardProps } from 'radix-vue'
import type { CheckboxProps } from './Checkbox.vue'
</script>

<script setup lang="ts">
import Checkbox from './Checkbox.vue'
import { injectCheckboxGroupRootContext } from './CheckboxGroupRoot.vue'

const props = defineProps<CheckboxProps>()
const forwarded = useForwardProps(props)

useForwardExpose()

const rootContext = injectCheckboxGroupRootContext()

const disabled = computed(() => {
  return rootContext.disabled?.value || props.disabled
})

const checked = computed(() => {
  return rootContext.checked.value
})
</script>

<template>
  <Checkbox
    v-bind="{
      ...forwarded,
      name: props.name || rootContext.name,
      checked,
      disabled
    }"
    @update:checked="rootContext.toggleModelValue"
  >
  </Checkbox>
</template>
