<script lang="ts">
export type SavingStatus = 'idle' | 'saving' | 'saved'
export interface SavingIndicatorProps {
  status: SavingStatus
  size?: '1' | '2' | '3'
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<SavingIndicatorProps>(), {
  size: '2',
})
</script>

<template>
  <div
    class="ui-SavingIndicator"
    :class="`r-size-${size}`"
    :data-status="props.status"
  >
    <Icon
      v-if="props.status === 'saving'"
      icon="svg-spinners:180-ring"
    />
    <Icon
      v-else-if="props.status === 'saved'"
      icon="lucide:check-circle-2"
    />
  </div>
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
