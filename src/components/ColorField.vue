<script lang="ts">
import type { ColorType, RadiusType } from './types'

export interface ColorFieldProps {
  id?: string
  modelValue?: string
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
  color?: ColorType
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { extractClass } from './util'

const props = withDefaults(defineProps<ColorFieldProps>(), {
  size: '2',
  variant: 'surface',
})

const emits = defineEmits<{
  'update:modelValue': [string]
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.modelValue || '#000000',
  passive: (props.modelValue === undefined) as false,
})
const resetClass = computed(() => {
  return extractClass(props, ['size', 'variant'])
})
</script>

<template>
  <div
    class="ui-TextField ui-ColorField"
    :class="resetClass"
    :data-accent-color="props.color"
  >
    <input
      :id="props.id"
      v-model="modelValue"
      class="ui-ColorFieldInput"
      type="color"
    >
    <input
      v-model="modelValue"
      class="ui-TextFieldInput"
      type="text"
      pattern="^#[0-9a-f]{6}$"
    >
  </div>
</template>

<style>
@supports selector(:has(*)) {
  .ui-ColorField:where(.r-variant-surface):where(:has(input:focus)) {
    --text-field-border-color: var(--text-field-focus-color);
    box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
}
.ui-ColorFieldInput {
  padding: 0;
  border: none;
  background: transparent;
}
.ui-ColorField:where(.r-variant-surface) .ui-ColorFieldInput {
  width: calc(var(--text-field-height) - 4px);
  height: calc(var(--text-field-height) - 4px);
}
.ui-ColorField:where(.r-variant-soft) .ui-ColorFieldInput {
  width: var(--text-field-height);
  height: var(--text-field-height);
  margin-left: calc(var(--text-field-padding) / 4);
}
</style>
