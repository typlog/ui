<script lang="ts">
import type { Ref } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { createContext } from 'reka-ui'

export interface CheckboxGroupRootProps extends PrimitiveProps {
  disabled?: boolean
  name?: string
}

interface CheckboxGroupRootContext {
  selected: Ref<string[]>
  checked: Ref<boolean | 'indeterminate'>
  addModelValue: (value: string) => void
  removeModelValue: (value: string) => void
  toggleModelValue: (checked: boolean) => void
  initAllValue: (value: string) => void
  removeAllValue: (value: string) => void
  disabled?: Ref<boolean>
  name?: string
}

export const [injectCheckboxGroupRootContext, provideCheckboxGroupRootContext]
  = createContext<CheckboxGroupRootContext>('ui_CheckboxGroupRoot')
</script>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import { Primitive } from 'reka-ui'

const props = defineProps<CheckboxGroupRootProps>()

const { disabled, name } = toRefs(props)

const allValues = ref<string[]>([])

const [modelValue, modifiers] = defineModel<any[]>({
  default: [],
  set (value) {
    if (modifiers.number) {
      value = value.map((v: any) => Number(v))
    } else if (modifiers.trim) {
      value = value.map((v: any) => v.trim())
    }
    return value
  },
})

const selected = computed(() => {
  return modelValue.value || []
})

const checked = computed(() => {
  if (!allValues.value.length) {
    return false
  }
  if (modelValue.value?.length === allValues.value.length) {
    return true
  } else if (modelValue.value?.length) {
    return 'indeterminate'
  } else {
    return false
  }
})

const removeModelValue = (value: string) => {
  const index = modelValue.value?.indexOf(value)
  if (index !== -1 && index !== undefined) {
    modelValue.value?.splice(index, 1)
  }
}

provideCheckboxGroupRootContext({
  selected,
  checked,
  addModelValue: (value: string) => {
    if (modelValue.value?.indexOf(value) === -1) {
      modelValue.value?.push(value)
    }
  },
  removeModelValue,
  toggleModelValue: (checked: boolean) => {
    if (checked) {
      modelValue.value = [...allValues.value]
    } else {
      modelValue.value = []
    }
  },
  initAllValue: (value: string) => {
    allValues.value.push(value)
  },
  removeAllValue: (value: string) => {
    allValues.value.splice(allValues.value.indexOf(value), 1)
    removeModelValue(value)
  },
  disabled,
  name: name?.value,
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
  >
    <slot></slot>
  </Primitive>
</template>
