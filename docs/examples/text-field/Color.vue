<script setup lang="ts">
import { TextField } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4">
      <TextField placeholder="Search the docs…" variant="surface" color="indigo" />
      <TextField placeholder="Search the docs…" variant="soft" color="indigo" />
    </div>
    <div class="flex items-center gap-4">
      <TextField placeholder="Search the docs…" variant="surface" color="green" />
      <TextField placeholder="Search the docs…" variant="soft" color="green" />
    </div>
    <div class="flex items-center gap-4">
      <TextField placeholder="Search the docs…" variant="surface" color="red" />
      <TextField placeholder="Search the docs…" variant="soft" color="red" />
    </div>
  </div>
</template>
