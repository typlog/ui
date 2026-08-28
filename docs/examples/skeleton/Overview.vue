<script setup lang="ts">
import { Card, Skeleton } from '@typlog/ui'
</script>

<template>
  <Card class="w-full max-w-md">
    <div class="flex items-center gap-3">
      <Skeleton
        class="size-10 shrink-0"
        radius="full"
      />
      <div class="min-w-0 flex-1 space-y-2">
        <Skeleton class="h-4 w-2/5" />
        <Skeleton class="h-3 w-4/5" radius="small" />
      </div>
    </div>
    <div class="mt-5 space-y-2">
      <Skeleton class="h-3 w-full" />
      <Skeleton class="h-3 w-11/12" />
      <Skeleton class="h-3 w-3/5" />
    </div>
  </Card>
</template>
