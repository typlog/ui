<script lang="ts">
import type { DefaultTheme } from 'vitepress'
</script>

<script setup lang="ts">
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  ChevronIcon,
} from '#components'
import DocSidebarItem from './SidebarItem.vue'

defineProps<{sidebar: DefaultTheme.SidebarItem[]}>()
</script>

<template>
  <div
    v-for="item in sidebar"
    :key="item.text"
  >
    <CollapsibleRoot
      v-if="item.items?.length"
      class="mb-6"
      default-open
    >
      <CollapsibleTrigger class="flex items-center justify-between w-full px-4">
        <span class="font-semibold">{{ item.text }}</span>
        <ChevronIcon />
      </CollapsibleTrigger>
      <CollapsibleContent>
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
  </div>
</template>
