<script setup lang="ts">
import { Pagination } from '@typlog/ui'
</script>

<template>
  <Pagination
    :total="200"
    :items-per-page="10"
    variant="soft"
  />
</template>
