<script lang="ts">
import type { DefaultTheme } from 'vitepress'

const findFirstLink = (item: DefaultTheme.SidebarItem) => {
  if (item.link) {
    return item.link
  } else if (item.items) {
    return findFirstLink(item.items[0])
  } else {
    return null
  }
}

const isActiveLink = (item: DefaultTheme.SidebarItem, link: string) => {
  if (item.link === link) {
    return true
  }

  if (!item.items) {
    return false
  }

  for (const child of item.items) {
    if (isActiveLink(child, link)) {
      return true
    }
  }

  return false
}
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useData, useRoute } from 'vitepress'
import { ThemeProvider } from '#components'
import Navbar, { type NavbarItem } from './Navbar.vue'
import Doc from './Doc.vue'

const { path } = toRefs(useRoute())
const { theme } = useData()

const sidebar = computed(() => {
  const items = theme.value.sidebar as DefaultTheme.SidebarItem[]
  return items.map(item => {
    const link = findFirstLink(item)
    const active = isActiveLink(item, path.value)
    return { ...item, link, active } as NavbarItem
  }).filter(item => Boolean(item.link && item.text))
})

const activeSidebar = computed(() => {
  const found = sidebar.value.filter(item => item.active)[0]
  return found?.items || []
})
</script>

<template>
  <ThemeProvider>
    <Navbar :items="sidebar" />
    <Doc :sidebar="activeSidebar" />
  </ThemeProvider>
</template>
