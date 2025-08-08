<script lang="ts">
import type { SidebarItem } from '../types'
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from '#components'
import DocSidebarItem from './SidebarItem.vue'

defineProps<{sidebar: SidebarItem[]}>()
</script>

<template>
  <ul
    v-for="item in sidebar"
    :key="item.text"
  >
    <CollapsibleRoot
      v-if="item.items?.length"
      class="mb-4"
      size="1"
      as="li"
      default-open
    >
      <CollapsibleTrigger class="pl-2 pr-4 w-full">
        <div class="flex items-center gap-2">
          <Icon v-if="item.icon" :icon="item.icon" />
          {{ item.text }}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent class="py-1" as="ul">
        <DocSidebarItem
          v-for="subitem in item.items"
          :key="subitem.text"
          :item="subitem"
        />
      </CollapsibleContent>
    </CollapsibleRoot>

    <DocSidebarItem
      v-else
      :item="item"
    />
  </ul>
</template>
