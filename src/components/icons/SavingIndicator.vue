<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
export type SavingStatus = 'idle' | 'saving' | 'saved'

export interface SavingIndicatorProps extends Omit<PrimitiveProps, 'asChild'> {
  status: SavingStatus
  size?: '1' | '2' | '3'
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import CheckIcon from '~icons/ri/checkbox-circle-line'
import SpinnerIcon from './SpinnerIcon.vue'

const props = withDefaults(defineProps<SavingIndicatorProps>(), {
  size: '2',
  as: 'span',
})
</script>

<template>
  <Primitive
    class="ui-SavingIndicator"
    :class="`r-size-${size}`"
    :data-status="props.status"
  >
    <slot :status="status">
      <SpinnerIcon v-if="props.status === 'saving'" />
      <CheckIcon v-else-if="props.status === 'saved'" />
    </slot>
  </Primitive>
</template>

<style>
.ui-SavingIndicator {
  display: inline-flex;
  align-items: center;
}
.ui-SavingIndicator > svg {
  vertical-align: middle;
}
.ui-SavingIndicator:where([data-status="saving"]) {
  color: var(--gray-10);
  animation: ui-spin 2s infinite linear;
}
.ui-SavingIndicator:where([data-status="saved"]) {
  color: var(--green-10);
}
.ui-SavingIndicator:where(.r-size-1) {
  font-size: var(--space-3);
}
.ui-SavingIndicator:where(.r-size-2) {
  font-size: var(--space-4);
}
.ui-SavingIndicator:where(.r-size-3) {
  font-size: calc(1.25 * var(--space-4));
}
</style>
