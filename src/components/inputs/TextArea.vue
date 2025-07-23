<script lang="ts">
import type { ColorType, RadiusType } from '../types'

export interface TextAreaProps {
  class?: string
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  color?: ColorType
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { buildPropsClass } from '../util'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TextAreaProps>(), {
  size: '2',
  variant: 'surface',
})

const modelValue = defineModel<string>({
  default: '',
})

const resetClass = buildPropsClass(props, ['size', 'variant', 'resize', 'class'])
</script>

<template>
  <div
    class="ui-TextArea"
    :class="resetClass"
    :data-accent-color="props.color"
  >
    <textarea
      v-model="modelValue"
      v-bind="$attrs"
      class="ui-TextAreaInput"
    ></textarea>
  </div>
</template>

<style>
.ui-TextArea {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-weight: var(--font-weight-regular);
  font-style: normal;
  text-align: start;
  overflow: hidden;
  padding: var(--text-area-border-width);
  width: 100%;
}
.ui-TextAreaInput {
  border-radius: inherit;
  resize: none;
  display: block;
  width: 100%;
  flex-grow: 1;
  cursor: auto;
  border: none;
  padding: var(--text-area-padding-y) var(--text-area-padding-x);
  font-size: 1em;
  background-color: transparent;
}
.ui-TextAreaInput:focus {
  outline: none;
  box-shadow: none;
}
.ui-TextAreaInput::-webkit-scrollbar {
  width: var(--space-3);
  height: var(--space-3);
}
.ui-TextAreaInput::-webkit-scrollbar-track,
.ui-TextAreaInput::-webkit-scrollbar-thumb {
  background-clip: content-box;
  border: var(--space-1) solid transparent;
  border-radius: var(--space-3);
}
.ui-TextAreaInput::-webkit-scrollbar-track {
  background-color: var(--gray-a3);
}
.ui-TextAreaInput::-webkit-scrollbar-thumb {
  background-color: var(--gray-a8);
}
.ui-TextAreaInput:where(:not(:disabled))::-webkit-scrollbar-thumb:hover {
  background-color: var(--gray-a9);
}

.ui-TextArea:where(.r-size-1) {
  min-height: var(--space-8);
  border-radius: var(--radius-2);
}
.ui-TextArea:where(.r-size-1) .ui-TextAreaInput {
  --text-area-padding-y: calc(var(--space-1) - var(--text-area-border-width));
  --text-area-padding-x: calc(var(--space-1) * 1.5 - var(--text-area-border-width));
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
}
.ui-TextArea:where(.r-size-2) {
  min-height: var(--space-9);
  border-radius: var(--radius-2);
}
.ui-TextArea:where(.r-size-2) .ui-TextAreaInput {
  --text-area-padding-y: calc(var(--space-1) * 1.5 - var(--text-area-border-width));
  --text-area-padding-x: calc(var(--space-2) - var(--text-area-border-width));
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
}
.ui-TextArea:where(.r-size-3) {
  min-height: 80px;
  border-radius: var(--radius-3);
}
.ui-TextArea:where(.r-size-3) .ui-TextAreaInput {
  --text-area-padding-y: calc(var(--space-2) - var(--text-area-border-width));
  --text-area-padding-x: calc(var(--space-3) - var(--text-area-border-width));
  font-size: var(--font-size-3);
  line-height: var(--line-height-3);
  letter-spacing: var(--letter-spacing-3);
}
.ui-TextArea:where(.r-variant-surface) {
  --text-area-border-width: 1px;
  --text-area-border-color: var(--gray-a7);
  /* Blend inner shadow with page background */
  background-clip: content-box;
  background-color: var(--color-surface);
  border: var(--text-area-border-width) solid var(--text-area-border-color);
  color: var(--gray-12);
}
.ui-TextArea:where(.r-variant-surface):where(:focus-within) {
  --text-area-border-color: var(--focus-a8);
  box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.ui-TextArea:where(.r-variant-surface) .ui-TextAreaInput::placeholder {
  color: var(--gray-a10);
}
.ui-TextArea:where(.r-variant-surface) .ui-TextAreaInput:where(:disabled, :read-only) {
  background-image: linear-gradient(var(--gray-a2), var(--gray-a2));
  box-shadow: inset 0 0 0 var(--text-area-border-width) var(--gray-a6);
}
.ui-TextArea:where(.r-variant-soft) {
  --text-area-border-width: 0px;
  background-color: var(--accent-a3);
  color: var(--accent-12);
}
.ui-TextArea:where(.r-variant-soft):where(:focus-within) {
  outline: 2px solid var(--accent-8);
  outline-offset: -1px;
}
.ui-TextArea:where(.r-variant-soft) .ui-TextAreaInput::selection {
  background-color: var(--accent-a5);
}
.ui-TextArea:where(.r-variant-soft) .ui-TextAreaInput::placeholder {
  color: var(--accent-12);
  opacity: 0.65;
}
.ui-TextArea:where(.r-variant-soft) .ui-TextAreaInput:where(:disabled, :read-only) {
  background-image: linear-gradient(var(--gray-a2), var(--gray-a2));
  box-shadow: inset 0 0 0 var(--text-area-border-width) var(--gray-a6);
}
</style>
