<script setup lang="ts">
import { TextField } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-80">
      <TextField placeholder="Search the docs…" variant="surface" />
    </div>
    <div class="w-80">
      <TextField placeholder="Search the docs…" variant="soft" />
    </div>
  </div>
</template>
