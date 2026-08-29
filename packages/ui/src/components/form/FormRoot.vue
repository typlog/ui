<script lang="ts">
import type { FormError } from './context'

export interface FormRootProps {
  /** Field errors keyed by field name. */
  errors?: Record<string, FormError>
}

export type FormRootEmits = {
  submit: [event: SubmitEvent]
  reset: [event: Event]
  invalid: [event: Event]
}
</script>

<script setup lang="ts">
import { computed, nextTick, ref, toRef, watch } from 'vue'
import { provideFormContext } from './context'
import type { FieldContext } from './context'

const props = defineProps<FormRootProps>()
const emits = defineEmits<FormRootEmits>()
const fields = new Set<FieldContext>()
const localErrors = ref<Record<string, FormError>>({})
const clearedErrors = ref(new Set<string>())
const externalErrors = toRef(props, 'errors')

const mergedErrors = computed(() => {
  const result = { ...localErrors.value }
  for (const [name, value] of Object.entries(externalErrors.value || {})) {
    if (!clearedErrors.value.has(name)) result[name] = value
  }
  return result
})

watch(externalErrors, () => clearedErrors.value = new Set())

const context = provideFormContext({
  errors: mergedErrors,
  registerField: field => fields.add(field),
  unregisterField: field => fields.delete(field),
  clearError: name => {
    if (!name) {
      localErrors.value = {}
      clearedErrors.value = new Set(Object.keys(externalErrors.value || {}))
      return
    }
    if (name in localErrors.value) {
      const next = { ...localErrors.value }
      delete next[name]
      localErrors.value = next
    }
    if (name in (externalErrors.value || {})) {
      clearedErrors.value = new Set(clearedErrors.value).add(name)
    }
  },
  validate: async () => {
    const results = await Promise.all(Array.from(fields, field => field.validate()))
    return results.every(Boolean)
  },
})

const onSubmit = async (event: SubmitEvent) => {
  event.preventDefault()
  const valid = await context.validate()
  if (!valid) {
    await nextTick()
    const firstInvalid = Array.from(fields).find(field => field.invalid.value)?.control.value
    firstInvalid?.focus()
    return
  }
  emits('submit', event)
}

const onReset = (event: Event) => {
  emits('reset', event)
  fields.forEach(field => field.reset())
  nextTick(() => {
    localErrors.value = {}
    clearedErrors.value = new Set()
  })
}

const onInvalid = (event: Event) => {
  const target = event.target
  if (target instanceof HTMLElement) {
    const field = Array.from(fields).find(item => item.control.value === target
      || item.controlId.value === target.id
      || target.closest('[data-field-control]') === item.control.value)
    field?.syncValidity(target, true)
  }
  emits('invalid', event)
}
</script>

<template>
  <form
    class="ui-FormRoot"
    @submit="onSubmit"
    @reset="onReset"
    @invalid.capture="onInvalid"
  >
    <slot></slot>
  </form>
</template>
