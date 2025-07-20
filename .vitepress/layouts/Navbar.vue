<script lang="ts">
import type { DefaultTheme } from 'vitepress'

export interface NavbarItem extends DefaultTheme.SidebarItem {
  text: string
  link: string
  active: boolean
}
</script>

<script setup lang="ts">
import TextIcon from '../components/TextIcon.vue'

defineProps<{items: NavbarItem[]}>()
</script>

<template>
  <div id="navbar" class="z-30 fixed lg:sticky top-0 w-full">
    <div id="navbar-backdrop" class="absolute w-full h-full backdrop-blur border-b border-gray-a3"></div>
    <div class="mx-auto max-w-content relative">
      <div class="relative">
        <div class="flex items-center lg:px-12 h-16 min-w-0 mx-4 lg:mx-0">
          <div class="h-full relative flex-1 flex items-center gap-x-4 min-w-0 border-b border-gray-a3">
            <div class="flex-1 flex items-center gap-x-4">
              <a href="/">Typlog UI</a>
            </div>
          </div>
        </div>
        <div class="flex items-center h-14 py-4 px-5 lg:hidden">
          <div class="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3">
          </div>
        </div>
      </div>
      <div class="hidden lg:flex px-12 h-12">
        <div class="nav-tabs h-full flex text-sm space-x-6">
          <a
            v-for="item in items"
            :key="item.text"
            class="nav-tabs-item"
            :class="{ active: item.active }"
            :href="item.link"
          >
            <TextIcon :text="item.text" />
            <span>{{ item.text }}</span>
          </a>
        </div>
      </div>
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
