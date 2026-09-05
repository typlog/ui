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
  VisuallyHidden,
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
  ['allValues', 'as', 'contentAs', 'defaultValue', 'modelValue', 'name', 'required'],
)
const { forwardRef, currentElement } = useForwardExpose()

const usesTableSectionFormInput = computed(() => (
  typeof props.contentAs === 'string'
  && ['thead', 'tbody', 'tfoot'].includes(props.contentAs)
))

const isFormControl = computed(() => (
  currentElement.value
    ? Boolean(currentElement.value.closest('form'))
    : true
))

const externalFormEntries = computed(() => {
  if (!props.name)
    return []

  return modelValue.value.flatMap((value, index) => {
    if (typeof value === 'object' && value !== null) {
      return Object.entries(value).map(([key, item]) => ({
        name: `${props.name}[${index}][${key}]`,
        value: item,
      }))
    }

    return [{
      name: `${props.name}[${index}]`,
      value,
    }]
  })
})

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
    <caption
      v-if="usesTableSectionFormInput && isFormControl && props.name"
      class="ui-CheckboxGroupFormControl"
      aria-hidden="true"
    >
      <VisuallyHidden
        v-if="props.required && externalFormEntries.length === 0"
        as="input"
        feature="fully-hidden"
        :name="props.name"
        required
        value=""
      />
      <VisuallyHidden
        v-for="entry in externalFormEntries"
        v-else
        :key="entry.name"
        as="input"
        feature="fully-hidden"
        :name="entry.name"
        :required="props.required"
        :value="entry.value"
      />
    </caption>
    <slot
      name="select-all"
      :checkbox-props="checkboxProps"
    ></slot>
    <CheckboxGroupRoot
      v-bind="forwarded"
      class="ui-CheckboxGroupContent"
      :as="props.contentAs"
      :name="usesTableSectionFormInput ? undefined : props.name"
      :required="usesTableSectionFormInput ? undefined : props.required"
      :model-value="modelValue"
      @update:model-value="modelValue = $event"
    >
      <slot></slot>
    </CheckboxGroupRoot>
  </Primitive>
</template>

<style>
@layer components {
  .ui-CheckboxGroupFormControl {
    position: absolute;
    border: 0;
    width: 0;
    height: 0;
    min-height: 0;
    padding: 0;
    overflow: hidden;
  }
}
</style>
