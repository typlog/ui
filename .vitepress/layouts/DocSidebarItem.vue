<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import { toRefs } from 'vue'
import { useRoute } from 'vitepress'

defineProps<{ item: DefaultTheme.SidebarItem }>()

const { path } = toRefs(useRoute())
</script>

<template>
  <div
    class="sidebar-item"
    :class="{ active: path === item.link }"
  >
    <a
      :href="item.link"
      v-html="item.text"
    >
    </a>
  </div>
</template>

<style>
.sidebar-item {
  margin-top: 0.1rem;
}
.sidebar-item a {
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 2.15rem;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
  border-radius: var(--radius-4);
}
.sidebar-item.active a {
  font-weight: var(--font-weight-medium);
  color: var(--accent-a10);
  background-color: var(--accent-a3);
}
.sidebar-item a:hover {
  background-color: var(--gray-a3);
}
</style>
