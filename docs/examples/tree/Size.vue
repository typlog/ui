<script setup lang="ts">
import { TreeItem, TreeRoot } from '@typlog/ui'

interface Node {
  id: string
  name: string
  children?: Node[]
}

const items: Node[] = [
  { id: 'one', name: 'Compact tree', children: [{ id: 'one-child', name: 'A child item' }] },
  { id: 'two', name: 'Another item', children: [{ id: 'two-child', name: 'A nested item' }] },
]
const sizes = ['1', '2', '3'] as const
</script>

<template>
  <div class="flex max-w-md flex-col gap-4">
    <TreeRoot
      v-for="size in sizes"
      :key="size"
      :items="items"
      :get-key="item => item.id"
      :get-children="item => item.children"
      :size="size"
      :default-expanded="['one']"
    >
      <template #default="{ item }">
        <TreeItem
          v-bind="item.bind"
          :text="item.value.name"
        />
      </template>
    </TreeRoot>
  </div>
</template>
