<script lang="ts">
export interface PropData {
  name: string
  description: string
  type: string
  required: boolean
  inherit: null | string
  default?: string
}
</script>

<script setup lang="ts">
import {
  Table,
  Badge,
} from '#components'
import VPropType from './VPropType.vue'

defineProps<{items: PropData[]}>()
</script>

<template>
  <Table class="vp-PropsTable" variant="surface">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Default</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>
          <Badge class="font-mono" variant="surface">{{ item.name }}</Badge>
        </td>
        <td>
          <Badge
            v-if="item.default"
            class="font-mono"
            color="gray"
            variant="surface"
          >
            {{ item.default }}
          </Badge>
          <div v-else>
            <span class="text-sm text-gray-10">–</span>
          </div>
        </td>
        <td>
          <div class="flex flex-col">
            <VPropType :name="item.name" :type="item.type" />
            <div
              v-if="item.description"
              class="text-sm leading-5 flex flex-col gap-2 mt-2"
              v-html="item.description"
            >
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </Table>
</template>

<style>
.vp-PropsTable code {
  font-size: 0.95em;
  line-height: 1.25;
  background-color: var(--accent-a3);
  color: var(--accent-a11);
  padding: 0 0.25em;
  border-radius: var(--radius-1);
}
</style>
