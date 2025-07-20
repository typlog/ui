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
  <main class="max-w-content flex mx-auto px-4 lg:px-8 lg:gap-8">
    <div id="sidebar" class="z-20 hidden shrink-0 lg:block w-[18rem]">
      <div class="w-full sticky top-28">
        <div class="pt-8 text-sm leading-6">
          <DocSidebar :sidebar="sidebar" />
        </div>
      </div>
    </div>
    <div id="content-container" class="grow overflow-hidden lg:pl-10">
      <div class="flex gap-12 box-border pt-8">
        <article class="h-entry relative grow min-w-0 shrink">
          <h1 class="p-name text-4xl font-semibold">{{ page.title }}</h1>
          <div class="mt-2 text-lg text-gray-11">{{ page.description }}</div>
          <div class="flex gap-4 items-center mt-5 mb-12">
            <Badge
              v-if="frontmatter.status"
              class="capitalize"
              :color="statusColor"
            >
              {{ frontmatter.status }}
            </Badge>
            <a class="flex items-center gap-1 text-indigo-10 hover:underline" href="">
              <Icon class="text-gray-12" icon="simple-icons:github" />
              <span class="text-sm">View source</span>
            </a>
          </div>
          <Content class="e-content" />
        </article>
        <div class="hidden xl:flex xl:flex-col self-start sticky h-[calc(100vh-9.5rem)] top-0">
          <div class="z-10 hidden xl:flex pl-10 box-border w-[19rem] max-h-full">
            table of contents
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
