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
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const emits = defineEmits<CheckboxRootEmits>()

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: '2',
  variant: 'surface',
})

const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'size', 'variant', 'highContrast'])
const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
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
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="currentcolor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="state === 'indeterminate'"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"
          />
          <path
            v-else
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
          />
        </svg>
      </CheckboxIndicator>
    </template>
  </CheckboxRoot>
</template>

<style>
@layer components {
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
