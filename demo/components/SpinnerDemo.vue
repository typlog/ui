<script setup lang="ts">
import {
  Spinner,
  SavingIndicator,
} from '#components'

</script>

<template>
  <div class="mt-2 flex gap-4">
    <Spinner />
    <SavingIndicator status="saving" />
    <SavingIndicator status="saved" />
  </div>
</template>
