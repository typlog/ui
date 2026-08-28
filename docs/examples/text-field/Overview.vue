<script setup lang="ts">
import SearchIcon from '~icons/ri/search-line'
import { TextField } from '@typlog/ui'
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
