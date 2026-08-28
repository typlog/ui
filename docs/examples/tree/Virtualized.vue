<script setup lang="ts">
import { TreeItem, TreeRoot } from '@typlog/ui'

interface Node {
  id: string
  name: string
}

const items: Node[] = Array.from({ length: 100 }, (_, index) => ({
  id: `item-${index}`,
  name: `Virtual item ${index + 1}`,
}))
</script>

<template>
  <TreeRoot
    class="h-64 max-w-sm overflow-auto rounded-md border border-gray-6 p-2"
    :items="items"
    :get-key="item => item.id"
    :virtual="{
      estimateSize: 32,
      textContent: item => item.name,
    }"
  >
    <template #default="{ item }">
      <TreeItem
        v-bind="item.bind"
        :text="item.value.name"
      />
    </template>
  </TreeRoot>
</template>
