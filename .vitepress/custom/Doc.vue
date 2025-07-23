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
import DocSidebar from './doc/Sidebar.vue'
import DocOutline from './doc/Outline.vue'

defineProps<{sidebar: DefaultTheme.SidebarItem[]}>()

const { page, frontmatter } = useData()

const statusColor = computed(() => STATUS_COLOR_MAP[frontmatter.value.status])
</script>

<template>
  <main class="max-w-content flex mx-auto pt-28 pb-10 lg:pt-0 lg:px-8">
    <div id="sidebar" class="z-20 hidden shrink-0 lg:block w-[18rem]">
      <div class="w-full sticky top-28">
        <div class="pt-8 text-sm leading-6">
          <DocSidebar :sidebar="sidebar" />
        </div>
      </div>
    </div>
    <div id="content-container" class="grow overflow-hidden px-6 lg:pl-14">
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
            <a
              v-if="frontmatter.source"
              class="flex items-center gap-1 text-indigo-10 hover:underline"
              :href="frontmatter.source"
            >
              <Icon class="text-gray-12" icon="simple-icons:github" />
              <span class="text-sm">View source</span>
            </a>
          </div>
          <Content class="e-content prose lg:prose-lg max-w-none" />
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
