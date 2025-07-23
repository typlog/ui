<script setup lang="ts">
import { Icon, TextField } from '#components'
</script>

<template>
  <div class="flex">
    <TextField placeholder="Search the docs…">
      <template #left>
        <Icon icon="lucide:search" />
      </template>
    </TextField>
  </div>
</template>
