<script lang="ts">
import type { SidebarItem, NavSidebarItem } from './types'

const findFirstLink = (item: SidebarItem) => {
  if (item.link) {
    return item.link
  } else if (item.items) {
    return findFirstLink(item.items[0])
  } else {
    return null
  }
}

const isActiveLink = (item: SidebarItem, link: string) => {
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
import { useData, useRoute, Content } from 'vitepress'
import { ScrollArea } from '#components'
import Navbar from './partials/Navbar.vue'
import NavHead from './partials/NavHead.vue'
import NavMenu from './partials/NavMenu.vue'
import NavSidebar from './partials/NavSidebar.vue'
import DocSidebar from './partials/Sidebar.vue'
import DocOutline from './partials/Outline.vue'
import DocMetaInfo from './partials/MetaInfo.vue'

const { path } = toRefs(useRoute())
const { theme, page } = useData()

const sidebar = computed(() => {
  const items = theme.value.sidebar as SidebarItem[]
  return items.map(item => {
    const link = findFirstLink(item)
    const active = isActiveLink(item, path.value)
    return { ...item, link, active } as NavSidebarItem
  }).filter(item => Boolean(item.link && item.text))
})

const activeSidebar = computed(() => {
  const found = sidebar.value.filter(item => item.active)[0]
  return found?.items || []
})
</script>

<template>
  <Navbar>
    <NavHead />
    <NavMenu />
    <NavSidebar :items="sidebar" />
  </Navbar>
  <main class="max-w-content flex mx-auto pt-28 pb-10 lg:pt-0 lg:px-8">
    <div id="sidebar" class="z-20 hidden shrink-0 lg:block w-[18rem]">
      <div class="w-full sticky top-28">
        <ScrollArea class="pr-3 max-h-[calc(100vh-112px)]" scrollbars="vertical">
          <div class="pt-8 text-sm leading-6">
            <DocSidebar :sidebar="activeSidebar" />
          </div>
        </ScrollArea>
      </div>
    </div>
    <div id="content-container" class="grow overflow-hidden px-6 lg:pl-12">
      <div class="flex gap-12 box-border pt-8">
        <article class="h-entry relative grow min-w-0 shrink">
          <h1 class="p-name text-4xl font-semibold">{{ page.title }}</h1>
          <div class="mt-2 text-lg text-gray-11">{{ page.description }}</div>
          <DocMetaInfo />
          <Content class="e-content prose dark:prose-invert lg:prose-lg max-w-none" />
        </article>
      </div>
    </div>
    <div class="hidden xl:block">
      <aside id="aside" class="pl-6 pt-8 w-64 sticky top-28 overflow-y-auto">
        <DocOutline />
      </aside>
    </div>
  </main>
</template>

<style>
.reka-icon {
  mask: var(--reka-icon) no-repeat;
  mask-size: 100% 100%;
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  font-style: normal;
  background-color: var(--jade-8);
}
</style>
