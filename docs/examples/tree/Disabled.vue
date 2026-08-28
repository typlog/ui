<script setup lang="ts">
import { TreeItem, TreeRoot } from '@typlog/ui'

const items = [
  { id: 'available', name: 'Available item' },
  { id: 'disabled', name: 'Disabled item' },
  { id: 'other', name: 'Another item' },
]
</script>

<template>
  <TreeRoot
    :items="items"
    :get-key="item => item.id"
    class="max-w-sm"
  >
    <template #default="{ item }">
      <TreeItem
        v-bind="item.bind"
        :text="item.value.name"
        :disabled="item.value.id === 'disabled'"
      />
    </template>
  </TreeRoot>
</template>
