<script lang="ts">
import type { DefaultTheme } from 'vitepress'
</script>

<script setup lang="ts">
import { useData, Content } from 'vitepress'
import { ScrollArea } from '#components'
import DocSidebar from './doc/Sidebar.vue'
import DocOutline from './doc/Outline.vue'
import DocMetaInfo from './doc/MetaInfo.vue'

defineProps<{sidebar: DefaultTheme.SidebarItem[]}>()

const { page } = useData()
</script>

<template>
  <main class="max-w-content flex mx-auto pt-28 pb-10 lg:pt-0 lg:px-8">
    <div id="sidebar" class="z-20 hidden shrink-0 lg:block w-[18rem]">
      <div class="w-full sticky top-28">
        <ScrollArea class="pr-3 max-h-[calc(100vh-112px)]" scrollbars="vertical">
          <div class="pt-8 text-sm leading-6">
            <DocSidebar :sidebar="sidebar" />
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
