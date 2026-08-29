<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'

export interface FieldControlProps {
  as?: AsTag | Component
  asChild?: boolean
  id?: string
}
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { injectFieldContext } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FieldControlProps>(), { as: 'input' })
const attrs = useAttrs()
const field = injectFieldContext()
const primitiveRef = ref<{ $el?: HTMLElement }>()

const controlAttrs = computed(() => {
  const result = { ...attrs } as Record<string, unknown>
  const generatedDescribedBy = field.describedBy.value
  const consumerDescribedBy = attrs['aria-describedby']
  const describedBy = [consumerDescribedBy, generatedDescribedBy].filter(Boolean).join(' ')

  result.id = props.id || field.controlId.value
  if (field.name.value && !result.name) result.name = field.name.value
  if (field.required.value) result.required = true
  if (field.disabled.value) result.disabled = true
  if (describedBy) result['aria-describedby'] = describedBy
  if (field.invalid.value) result['aria-invalid'] = 'true'
  if (field.required.value) result['aria-required'] = 'true'
  result['data-field-control'] = true
  return result
})

const findControl = () => {
  const root = primitiveRef.value?.$el
  if (!root) return undefined
  if (root.matches?.('[data-field-control], input, textarea, select, button')) return root
  return root.querySelector<HTMLElement>('[data-field-control], input, textarea, select, button') || root
}

const onInput = () => {
  field.markDirty()
  field.syncValidity(findControl())
}
const onChange = () => {
  field.markDirty()
  field.syncValidity(findControl())
}
const onFocus = () => field.markFocused(true)
const onBlur = async () => {
  field.markFocused(false)
  field.markTouched()
  await field.validate()
}

onMounted(() => nextTick(() => field.setControl(findControl())))
</script>

<template>
  <Primitive
    v-bind="controlAttrs"
    ref="primitiveRef"
    :as="props.as"
    :as-child="props.asChild"
    @input="onInput"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot></slot>
  </Primitive>
</template>
