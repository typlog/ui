<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { TreeItem, TreeRoot } from '#components'

interface FileNode {
  id: string
  name: string
  type: 'folder' | 'file'
  comment?: string
  children?: FileNode[]
}

const items: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    comment: 'source',
    children: [
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        comment: 'UI primitives',
        children: [
          { id: 'button', name: 'Button.vue', type: 'file', comment: 'actions' },
          { id: 'tree', name: 'TreeItemIndicator.vue', type: 'file', comment: 'disclosure' },
        ],
      },
      { id: 'index', name: 'index.ts', type: 'file', comment: 'entrypoint' },
    ],
  },
  {
    id: 'docs',
    name: 'docs',
    type: 'folder',
    comment: 'documentation',
    children: [
      { id: 'empty', name: 'empty-state.md', type: 'file', comment: 'content' },
      { id: 'archive', name: 'archive', type: 'folder', children: [] },
    ],
  },
  { id: 'readme', name: 'README.md', type: 'file', comment: 'start here' },
  {
    id: 'long',
    name: 'a-very-long-file-name-that-stays-within-the-row-boundary.ts',
    type: 'file',
    comment: 'truncated when needed',
  },
]

const getIcon = (item: FileNode, isExpanded = false) => {
  if (item.type === 'folder')
    return isExpanded ? 'lucide:folder-open' : 'lucide:folder'
  if (item.name.endsWith('.vue')) return 'lucide:file-code-2'
  if (item.name.endsWith('.ts')) return 'lucide:file-type-2'
  if (item.name.endsWith('.md')) return 'lucide:file-text'
  return 'lucide:file'
}
</script>

<template>
  <TreeRoot
    :items="items"
    :get-key="item => item.id"
    :get-children="item => item.children"
    :default-expanded="['src']"
    class="max-w-xl"
  >
    <template #default="{ item }">
      <TreeItem
        v-bind="item.bind"
        :text="item.value.name"
      >
        <template #icon="{ isExpanded }">
          <Icon
            :icon="getIcon(item.value, isExpanded)"
            aria-hidden="true"
          />
        </template>
        <template v-if="item.value.comment" #trailing>
          {{ item.value.comment }}
        </template>
      </TreeItem>
    </template>
  </TreeRoot>
</template>
