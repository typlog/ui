<script setup lang="ts">
import { Pagination } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="ghost"
    >
    </Pagination>
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="outline"
    >
    </Pagination>
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="soft"
    >
    </Pagination>
    <Pagination
      :total="200"
      :items-per-page="10"
      show-edges
      color="indigo"
      variant="surface"
    >
    </Pagination>
  </div>
</template>
