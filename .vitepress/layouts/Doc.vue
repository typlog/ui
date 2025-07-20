<script lang="ts">
import type { DefaultTheme } from 'vitepress'
import type { ColorType } from '#components'

const STATUS_COLOR_MAP: Record<string, ColorType> = {
  stable: 'green',
}
</script>

<script setup lang="ts">
import { useData, Content } from 'vitepress'
import { computed } from 'vue'
import { Icon, Badge } from '#components'
import DocSidebar from './DocSidebar.vue'

defineProps<{sidebar: DefaultTheme.SidebarItem[]}>()

const { page, frontmatter } = useData()

const statusColor = computed(() => STATUS_COLOR_MAP[frontmatter.value.status])
</script>

<template>
  <div class="max-w-content px-4 mx-auto md:px-8">
    <div id="sidebar" class="z-20 hidden md:block fixed bottom-0 top-30 md:top-28 right-auto w-[18rem]">
      <div id="sidebar-content" class="absolute inset-0 z-10 stable-scrollbar-gutter overflow-auto pr-8 pb-10">
        <div class="relative md:text-sm md:leading-6">
          <div class="sticky top-0 h-8 bg-gradient-to-b from-background-light dark:from-background-dark"></div>
          <DocSidebar :sidebar="sidebar" />
        </div>
      </div>
    </div>
    <div id="content-container">
      <div class="flex flex-row gap-12 box-border w-full pt-40 md:pt-10">
        <div class="relative grow box-border flex-col w-full mx-auto px-1 md:pl-[23.7rem] md:-ml-12 lg:w-[calc(100%-28rem)]">
          <article class="h-entry">
            <h1 class="p-name text-4xl font-semibold">{{ page.title }}</h1>
            <div class="mt-2 text-lg text-gray-11">{{ page.description }}</div>
            <div class="flex gap-4 items-center mt-5 mb-12">
              <Badge class="capitalize" :color="statusColor">{{ frontmatter.status }}</Badge>
              <a class="flex items-center gap-1 text-indigo-10 hover:underline" href="">
                <Icon class="text-gray-12" icon="simple-icons:github" />
                <span class="text-sm">View source</span>
              </a>
            </div>
            <Content class="e-content" />
          </article>
        </div>
        <div class="hidden lg:flex self-start sticky lg:flex-col h-[calc(100vh-9.5rem)] top-[9.5rem]">
          <div class="z-10 hidden lg:flex pl-10 box-border w-[19rem] max-h-full">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
