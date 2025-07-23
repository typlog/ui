<script lang="ts">
import type { ColorType, RadiusType } from '../types'

export interface TextFieldProps {
  id?: string
  class?: string
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
  color?: ColorType
  radius?: RadiusType
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | 'file'
}
</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { buildPropsClass } from '../util'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
  size: '2',
  variant: 'surface',
})

const inputRef = useTemplateRef<HTMLInputElement>('input')

const onPointerDown = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.closest('input, button, a')) return

  const input = inputRef.value
  if (!input) return

  const isRightSlot = target.closest('[data-side=right]')
  const cursorPosition = isRightSlot ? input.value.length : 0
  requestAnimationFrame(() => {
    input.setSelectionRange(cursorPosition, cursorPosition)
    input.focus()
  })
}

const [modelValue, modifiers] = defineModel<any>({
  default: '',
  set (value) {
    if (modifiers.number) {
      return Number(value)
    }
    if (modifiers.trim) {
      return value.trim()
    }
    return value
  },
})

const resetClass = buildPropsClass(props, ['size', 'variant', 'class'])

const onFileChange = () => {
  modelValue.value = inputRef.value?.files
}
</script>

<template>
  <div
    class="ui-TextField"
    :class="resetClass"
    :data-radius="props.radius"
    :data-accent-color="props.color"
    @pointerdown="onPointerDown"
  >
    <input
      v-if="props.type === 'file'"
      :id="props.id"
      ref="input"
      :type="props.type"
      v-bind="$attrs"
      class="ui-TextFieldInput"
      @change="onFileChange"
    />
    <input
      v-else
      :id="props.id"
      ref="input"
      v-model="modelValue"
      :type="props.type"
      v-bind="$attrs"
      class="ui-TextFieldInput"
    />
    <div
      v-if="$slots.left"
      class="ui-TextFieldSlot"
      data-side="left"
    >
      <slot name="left"></slot>
    </div>
    <div
      v-if="$slots.right"
      class="ui-TextFieldSlot"
      data-side="right"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style>
.ui-TextField {
  display: flex;
  align-items: stretch;
  font-weight: var(--font-weight-regular);
  font-style: normal;
  text-align: start;
  box-sizing: border-box;
  height: var(--text-field-height);
  padding: var(--text-field-border-width);
  border-radius: var(--text-field-border-radius);
}
@supports selector(:has(*)) {
  .ui-TextField:where(:has(input[type=file])) {
    align-items: center;
  }
}
.ui-TextField::selection {
  background-color: var(--text-field-selection-color);
}

.ui-TextFieldInput {
  text-align: inherit;
  border: none;
  padding: 0;
  width: 100%;
  font-size: 1em;
  background-color: transparent;
  border-radius: calc(var(--text-field-border-radius) - var(--text-field-border-width));
  text-indent: var(--text-field-padding);
  cursor: auto;
}
.ui-TextFieldInput:focus {
  outline: none;
  box-shadow: none;
}
.ui-TextFieldInput:where([type=file]) {
  font-size: 0.875em;
  background-color: transparent;
  text-indent: calc(var(--text-field-padding) / 2);
}
.ui-TextFieldInput:where([type=date], [type=datetime-local], [type=time], [type=week], [type=month]) {
  text-indent: 0;
  padding-left: var(--text-field-padding);
  padding-right: var(--text-field-padding);
}
.ui-TextFieldInput::-webkit-inner-spin-button {
  appearance: none;
}
.ui-TextFieldInput::-webkit-search-cancel-button {
  appearance: none;
}
.ui-TextFieldInput::selection {
  background-color: var(--text-field-selection-color);
}
.ui-TextFieldInput::-webkit-calendar-picker-indicator {
  box-sizing: content-box;
  width: var(--text-field-native-icon-size);
  height: var(--text-field-native-icon-size);
  padding: var(--space-1);
  margin-left: 0;
  margin-right: calc(var(--space-1) * -1);
  border-radius: calc(var(--text-field-border-radius) - 2px);
}
.ui-TextFieldInput:where(:not([type=time]))::-webkit-calendar-picker-indicator {
  margin-left: var(--space-1);
}
.ui-TextFieldInput::-webkit-calendar-picker-indicator:where(:hover) {
  background-color: var(--gray-a3);
}
.ui-TextFieldInput::-webkit-calendar-picker-indicator:where(:focus-visible) {
  outline: 2px solid var(--text-field-focus-color);
}
.ui-TextFieldInput::-webkit-datetime-edit-ampm-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-day-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-hour-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-millisecond-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-minute-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-month-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-second-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-week-field:where(:focus),
.ui-TextFieldInput::-webkit-datetime-edit-year-field:where(:focus) {
  background-color: var(--text-field-selection-color);
  color: inherit;
  outline: none;
}
.ui-TextFieldInput:where(:autofill) {
  /* Reliably removes native autofill colors */
  background-clip: text;
  -webkit-text-fill-color: var(--gray-12);
}

.ui-TextFieldSlot {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  cursor: text;
  gap: var(--space-2);
  padding-left: var(--text-field-slot-padding);
  padding-right: var(--text-field-slot-padding);
}
.ui-TextFieldSlot:where([data-side=left]) {
  order: -1;
  margin-left: calc(var(--text-field-border-width) * -1);
  margin-right: 0;
}
.ui-TextFieldSlot:where([data-side=right]) {
  order: 0;
  margin-left: 0;
  margin-right: calc(var(--text-field-border-width) * -1);
}

.ui-TextFieldInput:where(:has(~ .ui-TextFieldSlot:not([data-side=right]))) {
  text-indent: 0;
  padding-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.ui-TextFieldInput:where(:has(~ .ui-TextFieldSlot[data-side=right],
~ .ui-TextFieldSlot:not([data-side=right]) ~ .ui-TextFieldSlot:not([data-side=left]))) {
  padding-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.ui-TextField:where(.r-size-1) {
  --text-field-height: var(--space-5);
  --text-field-padding: calc(var(--space-1) * 1.5 - var(--text-field-border-width));
  --text-field-border-radius: max(var(--radius-2), var(--radius-full));
  --text-field-native-icon-size: var(--space-3);
  --text-field-slot-padding: var(--space-1);
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-1);
}
.ui-TextField:where(.r-size-1) :where(.ui-TextFieldInput) {
  /* Reset size 2 padding bottom */
  padding-bottom: 0px;
  /* Safari credentials autofill icon */
}
.ui-TextField:where(.r-size-1) :where(.ui-TextFieldInput)::-webkit-textfield-decoration-container {
  padding-right: 0px;
  margin-right: -2px;
}
.ui-TextField:where(.r-size-2) {
  --text-field-height: var(--space-6);
  --text-field-padding: calc(var(--space-2) - var(--text-field-border-width));
  --text-field-border-radius: max(var(--radius-2), var(--radius-full));
  --text-field-native-icon-size: var(--space-4);
  --text-field-slot-padding: var(--space-2);
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-2);
}
.ui-TextField:where(.r-size-2) :where(.ui-TextFieldInput) {
  /* Avoid 1px baseline jitter when layout around the text field is subpixel-sized (e.g. vh units). */
  /* Works because as of Nov 2023, Chrome computes input text bounding box height as 16.5px on @2x screens. */
  padding-bottom: 0.5px;
  /* Safari credentials autofill icon */
}
.ui-TextField:where(.r-size-2) :where(.ui-TextFieldInput)::-webkit-textfield-decoration-container {
  padding-right: 2px;
  margin-right: 0px;
}
.ui-TextField:where(.r-size-3) {
  --text-field-height: var(--space-7);
  --text-field-padding: calc(var(--space-3) - var(--text-field-border-width));
  --text-field-border-radius: max(var(--radius-3), var(--radius-full));
  --text-field-native-icon-size: var(--space-4);
  --text-field-slot-padding: var(--space-3);
  font-size: var(--font-size-3);
  letter-spacing: var(--letter-spacing-3);
}
.ui-TextField:where(.r-size-3) :where(.ui-TextFieldInput) {
  /* Reset size 2 padding bottom */
  padding-bottom: 0px;
  /* Safari credentials autofill icon */
}
.ui-TextField:where(.r-size-3) :where(.ui-TextFieldInput)::-webkit-textfield-decoration-container {
  padding-right: 5px;
  margin-right: 0px;
}
.ui-TextField:where(.r-size-3) :where(.ui-TextFieldSlot) {
  gap: var(--space-3);
}

.ui-TextField:where(.r-variant-surface) {
  --text-field-selection-color: var(--focus-a5);
  --text-field-focus-color: var(--focus-a8);
  --text-field-border-width: 1px;
  --text-field-border-color: var(--gray-a7);
  /* Blend inner shadow with page background */
  background-clip: content-box;
  background-color: var(--color-surface);
  box-sizing: border-box;
  border: var(--text-field-border-width) solid var(--text-field-border-color);
  color: var(--gray-12);
}
@supports selector(:has(*)) {
  .ui-TextField:where(.r-variant-surface):where(:has(.ui-TextFieldInput:focus)) {
    --text-field-border-color: var(--text-field-focus-color);
    box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
}
@supports not selector(:has(*)) {
  .ui-TextField:where(.r-variant-surface):where(:focus-within) {
    --text-field-border-color: var(--text-field-focus-color);
    box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
}
.ui-TextField:where(.r-variant-surface) :where(.ui-TextFieldInput)::placeholder {
  color: var(--gray-a10);
}
.ui-TextField:where(.r-variant-surface) :where(.ui-TextFieldSlot) {
  color: var(--gray-a11);
}
.ui-TextField:where(.r-variant-surface) :where(.ui-TextFieldSlot):where([data-accent-color]) {
  color: var(--accent-a11);
}
.ui-TextField:where(.r-variant-surface):where(:has(.ui-TextFieldInput:where(:autofill):not(:disabled, :read-only:not([type=file])))) {
  /* Blend with focus color */
  background-image: linear-gradient(var(--focus-a2), var(--focus-a2));
  border-color: var(--gray-a5);
}
.ui-TextField:where(.r-variant-surface):where(:has(.ui-TextFieldInput:where(:disabled, :read-only:not([type=file])))) {
  /* Blend with grey */
  background-image: linear-gradient(var(--gray-a2), var(--gray-a2));
  border-color: var(--gray-a6);
}

/* soft */
.ui-TextField:where(.r-variant-soft) {
  --text-field-selection-color: var(--accent-a5);
  --text-field-focus-color: var(--accent-8);
  --text-field-border-width: 0px;
  background-color: var(--accent-a3);
  color: var(--accent-12);
  /* prettier-ignore */
}
@supports selector(:has(*)) {
  .ui-TextField:where(.r-variant-soft):where(:has(.ui-TextFieldInput:focus)) {
    outline: 2px solid var(--text-field-focus-color);
    outline-offset: -1px;
  }
}
@supports not selector(:has(*)) {
  .ui-TextField:where(.r-variant-soft):where(:focus-within) {
    outline: 2px solid var(--text-field-focus-color);
    outline-offset: -1px;
  }
}
.ui-TextField:where(.r-variant-soft) :where(.ui-TextFieldInput)::placeholder {
  color: var(--accent-12);
  opacity: 0.6;
}
.ui-TextField:where(.r-variant-soft) :where(.ui-TextFieldSlot) {
  color: var(--accent-12);
}
.ui-TextField:where(.r-variant-soft) :where(.ui-TextFieldSlot):where([data-accent-color]) {
  color: var(--accent-a11);
}
.ui-TextField:where(.r-variant-soft):where(:has(.ui-TextFieldInput:where(:autofill):not(:disabled, :read-only:not([type=file])))) {
  /* Use gray autofill color when component color is gray */
  box-shadow: inset 0 0 0 1px var(--accent-a5), inset 0 0 0 1px var(--gray-a4);
}
.ui-TextField:where(.r-variant-soft):where(:has(.ui-TextFieldInput:where(:disabled, :read-only:not([type=file])))) {
  background-color: var(--gray-a3);
}

/* all disabled and read-only text fields */
.ui-TextFieldInput:where(:disabled, :read-only:not([type=file])) {
  cursor: text;
  color: var(--gray-a11);
  /* Safari */
  -webkit-text-fill-color: var(--gray-a11);
}
.ui-TextFieldInput:where(:disabled, :read-only)::placeholder {
  opacity: 0.5;
}
.ui-TextFieldInput:where(:disabled, :read-only):where(:placeholder-shown) {
  cursor: var(--cursor-disabled);
}
.ui-TextFieldInput:where(:disabled, :read-only):where(:placeholder-shown) ~ :where(.ui-TextFieldSlot) {
  cursor: var(--cursor-disabled);
}
.ui-TextField:where(:has(.ui-TextFieldInput:where(:disabled, :read-only:not([type=file])))) {
  --text-field-selection-color: var(--gray-a5);
  --text-field-focus-color: var(--gray-8);
}
</style>
