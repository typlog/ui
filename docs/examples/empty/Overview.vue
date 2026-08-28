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
} from '@typlog/ui'
</script>

<template>
  <Empty class="min-h-64 border border-dashed border-gray-6">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Icon icon="lucide:inbox" />
      </EmptyMedia>
      <EmptyTitle>No messages yet</EmptyTitle>
      <EmptyDescription>
        When you receive a message, it will appear here.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button>Compose a message</Button>
      <Button variant="outline">Refresh</Button>
    </EmptyContent>
  </Empty>
</template>
