<script setup lang="ts">
import { Button, Spinner } from '#components'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Spinner aria-label="Loading" />
    <Spinner
      size="1"
      color="blue"
      aria-label="Loading"
    />
    <Spinner
      size="3"
      color="green"
      aria-label="Loading"
    />
    <Button
      disabled
      aria-label="Saving changes"
    >
      <Spinner
        size="1"
        aria-hidden="true"
      />
      Saving changes
    </Button>
  </div>
</template>
