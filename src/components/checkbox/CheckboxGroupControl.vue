<script lang="ts">
import { computed } from 'vue'
import { useForwardExpose, useForwardProps } from 'reka-ui'
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

const toggleModelValue = (checked: any) => {
  rootContext.toggleModelValue(checked)
}
</script>

<template>
  <Checkbox
    v-bind="{
      ...forwarded,
      name: props.name || rootContext.name,
      modelValue: rootContext.checked.value,
      disabled
    }"
    @update:model-value="toggleModelValue"
  >
  </Checkbox>
</template>
