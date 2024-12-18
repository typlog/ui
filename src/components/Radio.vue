<script lang="ts">
import type { ColorType } from './types'

export interface RadioProps {
  modelValue?: string
  color?: ColorType
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { extractClass } from './util'

const props = withDefaults(defineProps<RadioProps>(), {
  size: '2',
  variant: 'surface',
})

const emits = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.modelValue,
  passive: (props.modelValue === undefined) as false,
})

const resetClass = computed(() => {
  return extractClass(props, ['size', 'variant', 'highContrast'])
})
</script>

<template>
  <input
    v-model="modelValue"
    class="ui-Radio"
    :class="resetClass"
    type="radio"
    :data-accent-color="props.color"
  >
</template>

<style>
.ui-Radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  flex-shrink: 0;
  cursor: default;
  width: var(--radio-size);
  height: var(--radio-size);
  border: none;
  box-shadow: none;
}

.ui-Radio:checked {
  /* reset for tailwind */
  background-image: none;
}

.ui-Radio:focus {
  /* reset for tailwind */
  box-shadow: none;
}

.ui-Radio:where(:disabled, [data-disabled]) {
  cursor: not-allowed;
}

.ui-Radio::before {
  content: '';
  display: block;
  height: var(--radio-size);
  width: var(--radio-size);
  border-radius: 100%;
}

.ui-Radio::after {
  pointer-events: none;
  position: absolute;
  height: var(--radio-size);
  width: var(--radio-size);
  border-radius: 100%;
  /* Scale via transform to achieve perfect sub-pixel positioning */
  transform: scale(0.4);
}

.ui-Radio:where(:checked, [data-state='checked'])::after {
  content: '';
}

.ui-Radio:where(:focus-visible)::before {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}

.ui-Radio:where(.r-size-1) {
  --radio-size: calc(var(--space-4) * 0.875);
}
.ui-Radio:where(.r-size-2) {
  --radio-size: var(--space-4);
}
.ui-Radio:where(.r-size-3) {
  --radio-size: calc(var(--space-4) * 1.25);
}

.ui-Radio:where(.r-variant-surface):where(:not(:checked), [data-state='unchecked'])::before {
  background-color: var(--color-surface);
  box-shadow: inset 0 0 0 1px var(--gray-a7);
}

.ui-Radio:where(.r-variant-surface):where(:checked, [data-state='checked'])::before {
  background-color: var(--accent-indicator);
}

.ui-Radio:where(.r-variant-surface)::after {
  background-color: var(--accent-contrast);
}

.ui-Radio:where(.r-variant-surface):where(.r-high-contrast):where(:checked, [data-state='checked'])::before {
  background-color: var(--accent-12);
}

.ui-Radio:where(.r-variant-surface):where(.r-high-contrast)::after {
  background-color: var(--accent-1);
}

.ui-Radio:where(.r-variant-surface):where(:disabled, [data-disabled])::before {
  box-shadow: inset 0 0 0 1px var(--gray-a6);
  background-color: var(--gray-a3);
}

.ui-Radio:where(.r-variant-surface):where(:disabled, [data-disabled])::after {
  background-color: var(--gray-a8);
}

.ui-Radio:where(.r-variant-soft)::before {
  background-color: var(--accent-a4);
}

.ui-Radio:where(.r-variant-soft)::after {
  background-color: var(--accent-a11);
}

.ui-Radio:where(.r-variant-soft):where(.r-high-contrast)::after {
  background-color: var(--accent-12);
}

.ui-Radio:where(.r-variant-soft):where(:focus-visible)::before {
  outline-color: var(--accent-a8);
}

.ui-Radio:where(.r-variant-soft):where(:disabled, [data-disabled])::before {
  background-color: var(--gray-a3);
}

.ui-Radio:where(.r-variant-soft):where(:disabled, [data-disabled])::after {
  background-color: var(--gray-a8);
}
</style>
