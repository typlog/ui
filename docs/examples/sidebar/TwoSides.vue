<script setup lang="ts">
import { ref } from 'vue'
import {
  Sidebar,
  SidebarBody,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
  SidebarTrigger,
} from '@typlog/ui'

const leftOpen = ref(false)
const leftCollapsed = ref(false)
const rightOpen = ref(false)
const rightCollapsed = ref(false)
</script>

<template>
  <SidebarProvider class="h-80 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar
      v-slot="{ collapsed }"
      v-model:open="leftOpen"
      v-model:collapsed="leftCollapsed"
      collapsible="icon"
      width="13rem"
      mobile-title="Navigation"
      mobile-description="Choose a section"
    >
      <SidebarHeader><strong v-if="!collapsed">Workspace</strong></SidebarHeader>
      <SidebarBody class="text-sm text-gray-11">
        <span v-if="!collapsed">Project navigation</span>
      </SidebarBody>
      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <header class="flex h-12 items-center gap-2 border-b border-gray-4 px-4">
        <SidebarTrigger target="left" />
        <strong>Editor</strong>
        <SidebarTrigger target="right" class="ml-auto" />
      </header>
      <div class="p-4 text-sm text-gray-11">
        Left and right panels keep independent state. On mobile, opening one closes the other.
      </div>
    </SidebarInset>

    <Sidebar
      v-model:open="rightOpen"
      v-model:collapsed="rightCollapsed"
      side="right"
      collapsible="offcanvas"
      width="13rem"
      mobile-title="Inspector"
      mobile-description="Edit document properties"
    >
      <SidebarHeader><strong>Inspector</strong></SidebarHeader>
      <SidebarBody class="flex flex-col gap-3 text-sm">
        <label class="flex flex-col gap-1">
          <span class="text-gray-11">Slug</span>
          <input value="welcome" class="rounded-md border border-gray-6 bg-transparent px-2 py-1.5" />
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" checked /> Published
        </label>
      </SidebarBody>
      <SidebarRail />
    </Sidebar>
  </SidebarProvider>
</template>
