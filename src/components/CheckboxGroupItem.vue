<script lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useForwardExpose, useForwardProps } from 'reka-ui'
import type { CheckboxProps } from './Checkbox.vue'

export interface CheckboxGroupItemProps extends CheckboxProps {
  value: string
}
</script>

<script setup lang="ts">
import Checkbox from './Checkbox.vue'
import { injectCheckboxGroupRootContext } from './CheckboxGroupRoot.vue'

const props = defineProps<CheckboxGroupItemProps>()
const forwarded = useForwardProps(props)

useForwardExpose()

const rootContext = injectCheckboxGroupRootContext()

const disabled = computed(() => {
  return rootContext.disabled?.value || props.disabled
})

const checked = computed(() => {
  return rootContext.selected.value.indexOf(props.value) !== -1
})

const onUpdate = (checked: boolean) => {
  if (checked) {
    rootContext.addModelValue(props.value)
  } else {
    rootContext.removeModelValue(props.value)
  }
}

onMounted(() => {
  rootContext.initAllValue(props.value)
})
onBeforeUnmount(() => {
  rootContext.removeAllValue(props.value)
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
    @update:checked="onUpdate"
  >
  </Checkbox>
</template>
