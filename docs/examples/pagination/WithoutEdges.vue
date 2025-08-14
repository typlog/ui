<script setup lang="ts">
import { Pagination } from '#components'
</script>

<template>
  <Pagination
    :total="200"
    :items-per-page="10"
    variant="soft"
  />
</template>
