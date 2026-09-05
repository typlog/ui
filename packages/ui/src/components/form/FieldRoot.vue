<script lang="ts">
import type { FieldValidator, FormError } from './context'

export interface FieldRootProps {
  /** The form field name used for errors and native submission. */
  name?: string
  /** Explicitly sets the generated control ID. */
  id?: string
  /** Marks the field as required. */
  required?: boolean
  /** Disables the field control. */
  disabled?: boolean
  /** A validator-neutral callback returning one or more messages. */
  validate?: FieldValidator
  /** Initial field errors controlled by the consumer. */
  errors?: FormError
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRef, useId, watch } from 'vue'
import { injectFormContext, normalizeErrors, provideFieldContext } from './context'
import type { FieldContext } from './context'

const props = withDefaults(defineProps<FieldRootProps>(), {
  required: false,
  disabled: false,
})

const form = injectFormContext(null)
const uid = useId().replace(/:/g, '')
const name = toRef(props, 'name')
const required = toRef(props, 'required')
const disabled = toRef(props, 'disabled')
const control = ref<HTMLElement>()
const descriptionPresent = ref(false)
const validity = ref<ValidityState>()
const focused = ref(false)
const touched = ref(false)
const dirty = ref(false)
const nativeValidityVisible = ref(false)
const initialValue = ref<string>()
const localErrors = ref<string[]>(normalizeErrors(props.errors))
let validationVersion = 0
const controlId = computed(() => props.id || `ui-field-${uid}`)
const descriptionId = computed(() => `${controlId.value}-description`)
const errorId = computed(() => `${controlId.value}-error`)
const serverErrors = computed(() => normalizeErrors(name.value ? form?.errors.value[name.value] : undefined))
const fieldErrors = computed(() => {
  const nativeError = nativeValidityVisible.value && validity.value?.valid === false
    ? ('validationMessage' in (control.value || {}) ? (control.value as HTMLInputElement).validationMessage : undefined)
    : undefined
  return [...serverErrors.value, ...localErrors.value, ...normalizeErrors(nativeError)]
})
const invalid = computed(() => fieldErrors.value.length > 0)
const describedBy = computed(() => {
  const ids: string[] = []
  if (descriptionPresent.value) ids.push(descriptionId.value)
  if (fieldErrors.value.length) ids.push(errorId.value)
  return ids.length ? ids.join(' ') : undefined
})

const syncValidity = (element = control.value, reveal = false) => {
  if (reveal) nativeValidityVisible.value = true
  validity.value = element && 'validity' in element
    ? (element as HTMLInputElement).validity
    : undefined
}

const setControl = (element: HTMLElement | undefined) => {
  control.value = element
  if (element && 'value' in element && initialValue.value === undefined) {
    initialValue.value = (element as HTMLInputElement).value
  }
  syncValidity(element)
}

const setDescriptionPresent = (present: boolean) => {
  descriptionPresent.value = present
}

const valueOf = () => {
  const element = control.value as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | undefined
  return element?.value
}

const validate = async () => {
  const version = ++validationVersion
  syncValidity(undefined, true)
  let nextErrors: string[] = []
  if (props.validate) nextErrors = normalizeErrors(await props.validate(valueOf()))
  if (version !== validationVersion) return false
  localErrors.value = nextErrors
  return !invalid.value
}

const reset = () => {
  validationVersion++
  const element = control.value
  if (element && initialValue.value !== undefined && 'value' in element) {
    const input = element as HTMLInputElement
    input.value = initialValue.value
    element.dispatchEvent(new Event('input', { bubbles: true }))
  }
  validity.value = undefined
  nativeValidityVisible.value = false
  focused.value = false
  touched.value = false
  dirty.value = false
  localErrors.value = normalizeErrors(props.errors)
  syncValidity()
}

watch(() => props.errors, value => {
  validationVersion++
  localErrors.value = normalizeErrors(value)
})

const fieldContext: FieldContext = {
  name,
  controlId,
  descriptionId,
  descriptionPresent,
  errorId,
  describedBy,
  errors: fieldErrors,
  invalid,
  required,
  disabled,
  validity,
  control,
  setControl,
  setDescriptionPresent,
  markFocused: value => { focused.value = value },
  markTouched: () => { touched.value = true },
  markDirty: () => {
    validationVersion++
    dirty.value = true
    localErrors.value = []
    nativeValidityVisible.value = false
    form?.clearError(name.value)
  },
  validate,
  syncValidity,
  reset,
}

provideFieldContext(fieldContext)

onMounted(() => form?.registerField(fieldContext))

onBeforeUnmount(() => {
  form?.unregisterField(fieldContext)
})
</script>

<template>
  <div
    class="ui-FieldRoot"
    :data-invalid="invalid || undefined"
    :data-focused="focused || undefined"
    :data-touched="touched || undefined"
    :data-dirty="dirty || undefined"
    :data-disabled="disabled || undefined"
    :data-required="required || undefined"
  >
    <slot></slot>
  </div>
</template>

<style src="./style.css"></style>
