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
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center mt-5 mb-12 font-medium">
            <div v-if="frontmatter.status">
              <Badge
                class="capitalize"
                :color="statusColor"
              >
                {{ frontmatter.status }}
              </Badge>
            </div>
            <div v-if="frontmatter.source">
              <a
                class="flex items-center gap-1 text-gray-11 hover:text-gray-12"
                :href="frontmatter.source"
              >
                <Icon class="text-gray-12 text-sm" icon="simple-icons:github" />
                <span class="text-sm">View source</span>
              </a>
            </div>
            <div v-if="frontmatter.radix">
              <a
                class="flex items-center gap-1 text-gray-11 hover:text-gray-12"
                :href="frontmatter.radix"
              >
                <Icon class="text-gray-12 text-sm" icon="simple-icons:radixui" />
                <span class="text-sm">Radix Themes</span>
              </a>
            </div>
            <div v-if="frontmatter.reka">
              <a
                class="flex items-center gap-1 text-gray-11 hover:text-gray-12"
                :href="frontmatter.reka"
              >
                <i class="reka-icon"></i>
                <span class="text-sm">Reka UI</span>
              </a>
            </div>
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
