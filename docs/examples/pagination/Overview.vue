<script setup lang="ts">
import { Pagination } from '#components'
</script>

<template>
  <Pagination
    :total="100"
    :items-per-page="10"
    show-edges
  >
  </Pagination>
</template>
