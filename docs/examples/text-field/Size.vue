<script setup lang="ts">
import { TextField } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-60">
      <TextField placeholder="Search the docs…" size="1" />
    </div>
    <div class="w-80">
      <TextField placeholder="Search the docs…" size="2" />
    </div>
    <div class="w-96">
      <TextField placeholder="Search the docs…" size="3" />
    </div>
  </div>
</template>
