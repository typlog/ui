<script setup lang="ts">
import { Pagination } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      size="1"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      size="2"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      size="3"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      size="4"
    />
  </div>
</template>
