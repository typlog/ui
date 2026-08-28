<script setup lang="ts">
import { Pagination } from '@typlog/ui'
</script>

<template>
  <div class="flex flex-col gap-4">
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="ghost"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="outline"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="soft"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="surface"
    />
  </div>
</template>
