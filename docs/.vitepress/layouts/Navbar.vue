<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import { useData, useRoute } from 'vitepress'
import { computed, ref, toRefs, watch } from 'vue'

const { path } = toRefs(useRoute())
const { page, theme } = useData()
const sidebar = computed(() => (theme.value.sidebar as DefaultTheme.SidebarItem[]))
</script>

<template>
  <div id="navbar" class="z-30 fixed md:sticky top-0 w-full">
    <div id="navbar-backdrop" class="absolute w-full h-full backdrop-blur border-b border-gray-a3"></div>
    <div class="mx-auto max-w-content relative">
      <div class="relative"></div>
      <div class="hidden md:flex px-12 h-12">
        <div class="nav-tabs h-full flex text-sm space-x-6">
          <a v-for="item in sidebar" class="nav-tabs-item" :key="item.text" :href="item.link">{{ item.text }}</a>
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
  height: 100%;
  font-weight: var(--font-weight-medium);
  color: var(--gray-11);
}
.nav-tabs a.nav-tabs-item:hover {
  color: var(--gray-12);
}
</style>
