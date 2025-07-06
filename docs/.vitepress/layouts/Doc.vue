<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import { useData, useRoute } from 'vitepress'
import { computed, ref, toRefs, watch } from 'vue'

const { path } = toRefs(useRoute())
const { page, theme } = useData()
const sidebar = computed(() => (theme.value.sidebar as DefaultTheme.SidebarItem[]))
</script>

<template>
  <div class="max-w-content px-4 mx-auto md:px-8">
    <div id="sidebar" class="z-20 hidden md:block fixed bottom-0 right-auto w-[18rem]">
      <div id="sidebar-content" class="absolute inset-0 z-10 stable-scrollbar-gutter overflow-auto pr-8 pb-10">
      </div>
    </div>
    <div id="content-container">
      <div class="flex flex-row gap-12 box-border w-full pt-40 md:pt-10">
        <div class="relative grow box-border flex-col w-full mx-auto px-1 md:pl-[23.7rem] md:-ml-12 lg:w-[calc(100%-28rem)]">
          <Content />
        </div>
        <div class="hidden lg:flex self-start sticky lg:flex-col h-[calc(100vh-9.5rem)] top-[9.5rem]">
          <div class="z-10 hidden lg:flex pl-10 box-border w-[19rem] max-h-full">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
