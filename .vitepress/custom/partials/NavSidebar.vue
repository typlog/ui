<script lang="ts">
import type { NavSidebarItem } from '../types'
</script>


<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{items: NavSidebarItem[]}>()
</script>

<template>
  <div class="hidden lg:flex px-12 h-12">
    <div class="nav-tabs w-full h-full flex text-sm space-x-6 border-t border-gray-a3">
      <a
        v-for="item in items"
        :key="item.text"
        class="nav-tabs-item"
        :class="{ active: item.active }"
        :href="item.link"
      >
        <Icon v-if="item.icon" :icon="item.icon" />
        <span>{{ item.text }}</span>
      </a>
    </div>
  </div>
</template>

<style>
.nav-tabs a.nav-tabs-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: 100%;
  font-weight: var(--font-weight-medium);
  color: var(--gray-11);
  padding-top: 2px;
  border-bottom: 2px solid transparent;
}
.nav-tabs a.nav-tabs-item:where(.active) {
  font-weight: var(--font-weight-semibold);
  color: var(--gray-12);
  border-color: var(--accent-10);
}
.nav-tabs a.nav-tabs-item:hover {
  color: var(--gray-12);
  border-color: var(--gray-10);
}
</style>
