<script setup lang="ts">
import { ref } from 'vue'
import {
  Pagination,
} from '#components'

const p1 = ref(1)
</script>

<template>
  <div class="mt-2 flex gap-4">
    <Pagination v-model:page="p1" :total="1000" />
  </div>
</template>
