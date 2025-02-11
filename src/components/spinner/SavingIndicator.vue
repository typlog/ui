<script lang="ts">
export type SavingStatus = 'idle' | 'saving' | 'saved'
export interface SavingIndicatorProps {
  status: SavingStatus
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Spinner from './Spinner.vue'

const props = defineProps<{status: SavingStatus}>()
</script>

<template>
  <Spinner
    v-if="props.status === 'saving'"
    class="ui-SavingIndicator _saving"
  />
  <Icon
    v-else-if="props.status === 'saved'"
    class="ui-SavingIndicator _saved"
    icon="lucide:check-circle-2"
  />
</template>

<style>
.ui-SavingIndicator._saving {
  color: var(--gray-10);
}
.ui-SavingIndicator._saved {
  color: var(--green-10);
}
</style>
