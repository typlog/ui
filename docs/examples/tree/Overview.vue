<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { TreeItem, TreeRoot } from '#components'

interface Node {
  id: string
  name: string
  icon: string
  children?: Node[]
}

const items: Node[] = [
  {
    id: 'components',
    name: 'Components',
    icon: 'lucide:folder',
    children: [
      { id: 'button', name: 'Button', icon: 'lucide:box' },
      { id: 'card', name: 'Card', icon: 'lucide:box' },
    ],
  },
  {
    id: 'docs',
    name: 'Documentation',
    icon: 'lucide:folder',
    children: [
      { id: 'getting-started', name: 'Getting started', icon: 'lucide:file-text' },
      { id: 'theming', name: 'Theming', icon: 'lucide:file-text' },
    ],
  },
]
</script>

<template>
  <TreeRoot
    :items="items"
    :get-key="item => item.id"
    :get-children="item => item.children"
    :default-expanded="['components']"
    class="max-w-sm"
  >
    <template #default="{ item }">
      <TreeItem
        v-bind="item.bind"
        :text="item.value.name"
        :icon="item.value.icon"
      >
        <template #icon="{ isExpanded }">
          <Icon
            :icon="item.value.children ? (isExpanded ? 'lucide:folder-open' : 'lucide:folder') : item.value.icon"
            aria-hidden="true"
          />
        </template>
      </TreeItem>
    </template>
  </TreeRoot>
</template>
