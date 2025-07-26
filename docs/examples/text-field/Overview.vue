<script setup lang="ts">
import SearchIcon from '~icons/lucide/search'
import { TextField } from '#components'
</script>

<template>
  <div class="flex">
    <TextField placeholder="Search the docs…">
      <template #left>
        <SearchIcon />
      </template>
    </TextField>
  </div>
</template>
