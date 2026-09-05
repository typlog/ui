<script setup lang="ts">
import { SavingIndicator, SpinnerIcon } from '@typlog/ui'
</script>

<template>
  <div class="flex items-center gap-6">
    <span class="flex items-center gap-2">
      <SpinnerIcon aria-hidden="true" />
      Loading
    </span>
    <span class="flex items-center gap-2">
      <SavingIndicator status="saving" aria-hidden="true" />
      Saving
    </span>
    <span class="flex items-center gap-2">
      <SavingIndicator status="saved" aria-hidden="true" />
      Saved
    </span>
  </div>
</template>
