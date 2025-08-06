<script lang="ts">
import type { SidebarItem } from './types'

export interface NavbarItem extends SidebarItem {
  text: string
  link: string
  active: boolean
}
</script>

<script setup lang="ts">
import MoonIcon from '~icons/radix-icons/moon'
import SunIcon from '~icons/radix-icons/sun'
import MenuIcon from '~icons/radix-icons/hamburger-menu'
import { Icon } from '@iconify/vue'
import { IconButton } from '#components'
import { useColorMode } from '@vueuse/core'

defineProps<{items: NavbarItem[]}>()

const mode = useColorMode()

const changeColorMode = () => {
  if (mode.value === 'dark') {
    mode.value = 'light'
  } else {
    mode.value = 'dark'
  }
}
</script>

<template>
  <div id="navbar" class="z-30 fixed lg:sticky top-0 w-full">
    <div id="navbar-backdrop" class="absolute w-full h-full backdrop-blur border-b border-gray-a3"></div>
    <div class="mx-auto max-w-content relative">
      <div class="relative">
        <div class="flex items-center lg:px-12 h-16 min-w-0 mx-4 lg:mx-0">
          <div class="h-full relative flex-1 flex items-center gap-x-4 min-w-0">
            <div class="flex-1 flex items-center gap-x-4">
              <a href="/">Typlog UI</a>
            </div>
            <div class="hidden md:flex md:pl-6 items-center grow justify-between">
            </div>
            <div class="flex items-center gap-x-2">
              <IconButton variant="ghost" color="gray" @click="changeColorMode">
                <MoonIcon v-if="mode === 'dark'" />
                <SunIcon v-else />
              </IconButton>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between h-12 py-4 px-5 lg:hidden border-t border-gray-a3">
          <div class="flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3">
            <button class="inline-flex items-center gap-2 p-1" aria-label="Menu" aria-controls="doc-sidebar">
              <MenuIcon />
              <span class="inline md:hidden">Menu</span>
            </button>
          </div>
          <div class="flex items-center">
            <button class="js-menu flex items-center gap-1 text-sm" aria-expanded="false" aria-controls="doc-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 6h10"/>
                <path d="M6 12h9"/>
                <path d="M11 18h7"/>
              </svg>
              <span class="font-medium text-gray-11">On this page</span>
            </button>
          </div>
        </div>
      </div>
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
