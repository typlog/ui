<script setup lang="ts">
import { computed, ref } from 'vue'
import { TreeItem, TreeRoot } from '#components'

interface Node {
  id: string
  name: string
  children?: Node[]
}

const items: Node[] = [
  { id: 'design', name: 'Design', children: [{ id: 'tokens', name: 'Tokens' }, { id: 'patterns', name: 'Patterns' }] },
  { id: 'engineering', name: 'Engineering', children: [{ id: 'frontend', name: 'Frontend' }, { id: 'backend', name: 'Backend' }] },
]
const selected = ref<Node[]>([])
const selectedLabel = computed(() => selected.value.length ? selected.value.map(item => item.name).join(', ') : 'Nothing selected')
</script>

<template>
  <div class="flex max-w-sm flex-col gap-3">
    <TreeRoot
      v-model="selected"
      multiple
      :items="items"
      :get-key="item => item.id"
      :get-children="item => item.children"
      :default-expanded="['design', 'engineering']"
    >
      <template #default="{ item }">
        <TreeItem
          v-bind="item.bind"
          :text="item.value.name"
        />
      </template>
    </TreeRoot>
    <p class="break-words text-sm text-gray-11">Selected: {{ selectedLabel }}</p>
  </div>
</template>
