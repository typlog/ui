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
      color="gray"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      color="indigo"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      color="crimson"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      color="violet"
    />
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      variant="soft"
      color="amber"
    />
  </div>
</template>
