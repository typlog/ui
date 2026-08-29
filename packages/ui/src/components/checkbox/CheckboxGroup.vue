<script lang="ts">
import type {
  AcceptableValue,
  CheckboxGroupRootEmits,
  CheckboxGroupRootProps,
  PrimitiveProps,
} from 'reka-ui'

export interface CheckboxGroupProps<T extends AcceptableValue = AcceptableValue> extends Omit<CheckboxGroupRootProps<T>, 'as' | 'asChild'> {
  /** The outer element or component. @default "div" */
  as?: PrimitiveProps['as']
  /** The element or component that wraps the default slot. @default "div" */
  contentAs?: PrimitiveProps['as']
  /**
   * All values controlled by the select-all checkbox.
   * Values outside this list remain unchanged when the group is cleared.
   */
  allValues?: T[]
}

export type CheckboxGroupEmits<T extends AcceptableValue = AcceptableValue>
  = CheckboxGroupRootEmits<T>

export interface CheckboxGroupSelectAllProps {
  modelValue: boolean | 'indeterminate'
  disabled?: boolean
  'onUpdate:modelValue': (value: boolean | 'indeterminate') => void
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { Ref } from 'vue'
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { isEqual } from 'ohash'
import {
  CheckboxGroupRoot,
  Primitive,
  useForwardExpose,
} from 'reka-ui'
import { useForwardPropsWithout } from '../util'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxGroupProps<T>>(), {
  as: 'div',
  contentAs: 'div',
})
const emits = defineEmits<CheckboxGroupEmits<T>>()

defineSlots<{
  'select-all'?: (props: {
    checkboxProps: CheckboxGroupSelectAllProps
  }) => any
  default?: () => any
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue ?? [],
  passive: (props.modelValue === undefined) as false,
}) as Ref<T[]>

const forwarded = useForwardPropsWithout(
  props,
  ['allValues', 'as', 'contentAs', 'defaultValue', 'modelValue'],
)
const { forwardRef } = useForwardExpose()

function includesValue(values: T[], value: T) {
  return values.some(item => isEqual(item, value))
}

const groupValues = computed<T[]>(() => {
  return (props.allValues ?? []).reduce<T[]>((values, value) => {
    if (!includesValue(values, value))
      values.push(value)
    return values
  }, [])
})

const selectAllState = computed<boolean | 'indeterminate'>(() => {
  if (groupValues.value.length === 0)
    return false

  const selected = groupValues.value.filter(value => (
    includesValue(modelValue.value, value)
  )).length

  if (selected === 0)
    return false
  if (selected === groupValues.value.length)
    return true
  return 'indeterminate'
})

function updateSelectAll(checked: boolean | 'indeterminate') {
  const otherValues = modelValue.value.filter(value => (
    !includesValue(groupValues.value, value)
  ))
  modelValue.value = checked === true
    ? [...otherValues, ...groupValues.value]
    : otherValues
}

const checkboxProps = computed<CheckboxGroupSelectAllProps>(() => ({
  modelValue: selectAllState.value,
  disabled: props.disabled,
  'onUpdate:modelValue': updateSelectAll,
}))
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :ref="forwardRef"
    class="ui-CheckboxGroup"
    :as="props.as"
  >
    <slot
      name="select-all"
      :checkbox-props="checkboxProps"
    ></slot>
    <CheckboxGroupRoot
      v-bind="forwarded"
      class="ui-CheckboxGroupContent"
      :as="props.contentAs"
      :model-value="modelValue"
      @update:model-value="modelValue = $event"
    >
      <slot></slot>
    </CheckboxGroupRoot>
  </Primitive>
</template>
