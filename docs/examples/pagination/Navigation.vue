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
      navigation="none"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      navigation="prev-next"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      navigation="first-last"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      navigation="all"
    />
  </div>
</template>
