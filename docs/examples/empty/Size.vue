<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@typlog/ui'

const sizes = ['1', '2', '3'] as const
</script>

<template>
  <div class="flex flex-col w-full gap-4">
    <Empty
      v-for="size in sizes"
      :key="size"
      :size="size"
      class="min-w-0 border border-gray-6 bg-gray-2"
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon icon="lucide:inbox" />
        </EmptyMedia>
        <EmptyTitle>Nothing here</EmptyTitle>
        <EmptyDescription>
          New items will appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
</template>
