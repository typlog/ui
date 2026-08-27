<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#components'
</script>

<template>
  <div class="flex flex-col w-full gap-4">
    <Empty class="min-w-0 border border-gray-6 bg-gray-2">
      <EmptyHeader>
        <EmptyMedia>
          <Icon icon="lucide:folder-open" />
        </EmptyMedia>
        <EmptyTitle>Empty folder</EmptyTitle>
        <EmptyDescription>Upload a file to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="1">Upload file</Button>
      </EmptyContent>
    </Empty>
    <Empty class="min-w-0 border border-gray-6 bg-gray-2">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon icon="lucide:inbox" />
        </EmptyMedia>
        <EmptyTitle>No notifications</EmptyTitle>
        <EmptyDescription>You're all caught up.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="1" variant="outline">Refresh</Button>
      </EmptyContent>
    </Empty>
  </div>
</template>
