<script setup lang="ts">
import { computed, ref } from 'vue'
import { TreeItem, TreeRoot } from '@typlog/ui'

interface Node {
  id: string
  name: string
  children?: Node[]
}

const items: Node[] = [
  { id: 'inbox', name: 'Inbox' },
  { id: 'archive', name: 'Archive' },
  { id: 'drafts', name: 'Drafts' },
]
const selected = ref<Node>()
const selectedLabel = computed(() => selected.value?.name ?? 'Nothing selected')
</script>

<template>
  <div class="flex max-w-sm flex-col gap-3">
    <TreeRoot
      v-model="selected"
      :items="items"
      :get-key="item => item.id"
      selection-behavior="replace"
    >
      <template #default="{ item }">
        <TreeItem
          v-bind="item.bind"
          :text="item.value.name"
        />
      </template>
    </TreeRoot>
    <p class="text-sm text-gray-11">Selected: {{ selectedLabel }}</p>
  </div>
</template>
