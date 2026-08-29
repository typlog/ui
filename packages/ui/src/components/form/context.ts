import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'

export type FormError = string | string[]
export type FieldValidator = (value: unknown) => FormError | null | Promise<FormError | null>

export interface FieldContext {
  name: Ref<string | undefined>
  controlId: Ref<string>
  descriptionId: Ref<string>
  descriptionPresent: Ref<boolean>
  errorId: Ref<string>
  describedBy: ComputedRef<string | undefined>
  errors: ComputedRef<string[]>
  invalid: ComputedRef<boolean>
  required: Ref<boolean>
  disabled: Ref<boolean>
  validity: Ref<ValidityState | undefined>
  control: Ref<HTMLElement | undefined>
  setControl: (element: HTMLElement | undefined) => void
  setDescriptionPresent: (present: boolean) => void
  markFocused: (focused: boolean) => void
  markTouched: () => void
  markDirty: () => void
  validate: () => Promise<boolean>
  syncValidity: (element?: HTMLElement, reveal?: boolean) => void
  reset: () => void
}

export interface FormContext {
  errors: Ref<Record<string, FormError>>
  registerField: (field: FieldContext) => void
  unregisterField: (field: FieldContext) => void
  clearError: (name?: string) => void
  validate: () => Promise<boolean>
}

export const [injectFieldContext, provideFieldContext]
  = createContext<FieldContext>('ui:FieldRoot')

export const [injectFormContext, provideFormContext]
  = createContext<FormContext>('ui:FormRoot')

export function normalizeErrors(value: FormError | undefined | null) {
  if (!value) return []
  return Array.isArray(value) ? value.filter(Boolean) : [value]
}
