<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import { toRefs } from 'vue'
import { useRoute } from 'vitepress'

defineProps<{ item: DefaultTheme.SidebarItem }>()

const { path } = toRefs(useRoute())
</script>

<template>
  <li
    class="sidebar-item"
    :class="{ active: path === item.link }"
  >
    <a
      :href="item.link"
      v-html="item.text"
    >
    </a>
  </li>
</template>

<style>
.sidebar-item.active {
  border-color: var(--accent-9);
}
.sidebar-item a {
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 2rem;
  margin-top: 1px;
  margin-bottom: 1px;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
  border-radius: var(--radius-2);
}
.sidebar-item.active a {
  font-weight: var(--font-weight-medium);
  color: var(--accent-a10);
  background-color: var(--accent-a3);
}
.sidebar-item a:hover {
  background-color: var(--gray-a3);
}

.ui-CollapsibleContent .sidebar-item {
  margin-left: var(--space-4);
  padding-left: var(--space-2);
  border-left: 1px solid var(--gray-a4);
}
.ui-CollapsibleContent .sidebar-item.active {
  border-color: var(--accent-a10);
}
.ui-CollapsibleContent .sidebar-item a {
  height: 1.875rem;
  padding-left: var(--space-3);
  padding-right: var(--space-3);
}
</style>
