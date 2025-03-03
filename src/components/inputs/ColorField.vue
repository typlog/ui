<script lang="ts">
import type { RadiusType } from '../types'

export interface ColorFieldProps {
  id?: string
  variant?: 'solid' | 'outline'
  size?: '1' | '2' | '3'
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { extractClass } from '../util'

const props = withDefaults(defineProps<ColorFieldProps>(), {
  size: '2',
  variant: 'solid',
})

const model = defineModel<string>({
  default: '#000000',
})

const resetClass = computed(() => {
  return extractClass(props, ['size', 'variant'])
})
</script>

<template>
  <div
    class="ui-ColorField"
    :class="resetClass"
    :data-radius="props.radius"
  >
    <input
      :id="props.id"
      v-model="model"
      class="ui-ColorFieldInput"
      type="color"
    >
  </div>
</template>

<style>
.ui-ColorField {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--color-field-size);
  height: var(--color-field-size);
  border-radius: var(--color-field-radius);
}

.ui-ColorField:where(.r-size-1) {
  --color-field-size: var(--space-5);
  --color-field-radius: max(var(--radius-2), var(--radius-full));
}
.ui-ColorField:where(.r-size-2) {
  --color-field-size: var(--space-6);
  --color-field-radius: max(var(--radius-2), var(--radius-full));
}

.ui-ColorField:where(.r-size-3) {
  --color-field-size: var(--space-7);
  --color-field-radius: max(var(--radius-3), var(--radius-full));
}

.ui-ColorField:where(.r-variant-solid) {
  --color-input-size: var(--color-field-size);
  --color-input-radius: var(--color-field-radius);
}

.ui-ColorField:where(.r-variant-outline) {
  --color-input-size: calc(var(--color-field-size) - var(--space-1));
  --color-input-radius: calc(var(--color-field-radius) - 2px);
  border: 1px solid var(--gray-a7);
}

.ui-ColorFieldInput {
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: var(--color-input-size);
  height: var(--color-input-size);
  border-radius: var(--color-input-radius);
}

.ui-ColorFieldInput::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: var(--color-input-radius);
}

.ui-ColorFieldInput::-webkit-color-swatch {
  border: none;
  border-radius: var(--color-input-radius);
}

.ui-ColorFieldInput::-moz-color-swatch {
  border: none;
  border-radius: var(--color-input-radius);
}

@supports selector(:has(*)) {
  .ui-ColorField:where(:has(.ui-ColorFieldInput:focus)) {
    --text-field-border-color: var(--text-field-focus-color);
    box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
}
</style>
