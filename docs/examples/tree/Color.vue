<script setup lang="ts">
import { TreeItem, TreeRoot } from '#components'

interface Node {
  id: string
  name: string
  children?: Node[]
}

const items: Node[] = [
  { id: 'overview', name: 'Overview', children: [{ id: 'summary', name: 'Summary' }] },
  { id: 'settings', name: 'Settings', children: [{ id: 'profile', name: 'Profile' }] },
]
const colors = ['indigo', 'blue', 'green', 'amber', 'crimson', 'violet'] as const
</script>

<template>
  <div class="flex max-w-md flex-col gap-4">
    <TreeRoot
      v-for="color in colors"
      :key="color"
      :items="items"
      :get-key="item => item.id"
      :get-children="item => item.children"
      :color="color"
      :default-value="items[0]"
      :default-expanded="['overview']"
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
