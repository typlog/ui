<script lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { ColorType } from '../types'

export interface CheckboxProps extends CheckboxRootProps {
  color?: ColorType
  variant?: 'surface' | 'soft'
  size?: '1' | '2' | '3'
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { extractForwardPropsEmits } from '../util'

const emits = defineEmits<CheckboxRootEmits>()

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: '2',
  variant: 'surface',
})
const [forwarded, resetClass] = extractForwardPropsEmits(props, emits, ['color', 'size', 'variant', 'highContrast'])
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    class="ui-Checkbox"
    :class="resetClass"
    :data-accent-color="props.color"
  >
    <template #default="{ state }">
      <CheckboxIndicator
        class="ui-CheckboxIndicator"
        as-child
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            v-if="state === 'indeterminate'"
            d="M5 12h14"
          />
          <path
            v-else
            d="M20 6 9 17l-5-5"
          />
        </svg>
      </CheckboxIndicator>
    </template>
  </CheckboxRoot>
</template>

<style>
.ui-Checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  flex-shrink: 0;
  cursor: default;
  height: var(--checkbox-size);
  border-radius: var(--checkbox-border-radius);
}
.ui-Checkbox::before {
  content: '';
  display: block;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--checkbox-border-radius);
}
.ui-Checkbox:where(:focus-visible)::before {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
.ui-Checkbox:where(:disabled) {
  cursor: not-allowed;
}
.ui-Checkbox:where(:disabled)::before {
  background-color: var(--gray-a3);
}
.ui-CheckboxIndicator {
  position: absolute;
  width: var(--checkbox-indicator-size);
  height: var(--checkbox-indicator-size);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.ui-Checkbox:where(.r-size-1) {
  --checkbox-size: calc(var(--space-4) * 0.875);
  --checkbox-indicator-size: calc(9px * var(--scaling));
  --checkbox-border-radius: calc(var(--radius-1) * 0.875);
}
.ui-Checkbox:where(.r-size-2) {
  --checkbox-size: var(--space-4);
  --checkbox-indicator-size: calc(10px * var(--scaling));
  --checkbox-border-radius: var(--radius-1);
}
.ui-Checkbox:where(.r-size-3) {
  --checkbox-size: calc(var(--space-4) * 1.25);
  --checkbox-indicator-size: calc(12px * var(--scaling));
  --checkbox-border-radius: calc(var(--radius-1) * 1.25);
}

.ui-Checkbox:where(.r-variant-surface):where([data-state='unchecked'])::before {
  background-color: var(--color-surface);
  box-shadow: inset 0 0 0 1px var(--gray-a7);
}
.ui-Checkbox:where(.r-variant-surface):where([data-state='checked'], [data-state='indeterminate'])::before {
  background-color: var(--accent-indicator);
}
.ui-Checkbox:where(.r-variant-surface):where([data-state='checked'], [data-state='indeterminate']) .ui-CheckboxIndicator {
  color: var(--accent-contrast);
}
.ui-Checkbox:where(.r-variant-surface):where(.r-high-contrast):where([data-state='checked'], [data-state='indeterminate'])::before {
  background-color: var(--accent-12);
}
.ui-Checkbox:where(.r-variant-surface):where(.r-high-contrast):where([data-state='checked'], [data-state='indeterminate']) .ui-CheckboxIndicator {
  color: var(--accent-1);
}
.ui-Checkbox:where(.r-variant-surface):disabled:where([data-state='checked'], [data-state='indeterminate'])::before {
  box-shadow: inset 0 0 0 1px var(--gray-a6);
  background-color: transparent;
}
.ui-Checkbox:where(.r-variant-surface):disabled:where([data-state='checked'], [data-state='indeterminate']) .ui-CheckboxIndicator {
  color: var(--gray-a8);
}

.ui-Checkbox:where(.r-variant-soft)::before {
  background-color: var(--accent-a5);
}
.ui-Checkbox:where(.r-variant-soft):where([data-state='checked'], [data-state='indeterminate']) .ui-CheckboxIndicator {
  color: var(--accent-a11);
}
.ui-Checkbox:where(.r-variant-soft):where(.r-high-contrast):where([data-state='checked'], [data-state='indeterminate']) .ui-CheckboxIndicator {
  color: var(--accent-12);
}
.ui-Checkbox:where(.r-variant-soft):disabled::before {
  background-color: var(--gray-a3);
}
.ui-Checkbox:where(.r-variant-soft):disabled .ui-CheckboxIndicator {
  color: var(--gray-a8);
}
</style>
