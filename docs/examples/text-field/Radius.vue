<script setup lang="ts">
import { TextField } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-80">
      <TextField placeholder="Search the docs…" radius="none" />
    </div>
    <div class="w-80">
      <TextField placeholder="Search the docs…" radius="small" />
    </div>
    <div class="w-80">
      <TextField placeholder="Search the docs…" radius="medium" />
    </div>
    <div class="w-80">
      <TextField placeholder="Search the docs…" radius="large" />
    </div>
    <div class="w-80">
      <TextField placeholder="Search the docs…" radius="full" />
    </div>
  </div>
</template>
