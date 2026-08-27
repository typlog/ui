<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '#components'

const links = [
  { label: 'Overview', icon: 'lucide:layout-dashboard' },
  { label: 'Posts', icon: 'lucide:file-text' },
  { label: 'Analytics', icon: 'lucide:chart-no-axes-column' },
  { label: 'Settings', icon: 'lucide:settings' },
]

const leftCollapsed = ref(false)
</script>

<template>
  <SidebarProvider class="h-112 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar v-model:collapsed="leftCollapsed" collapsible="icon" class="bg-gray-1">
      <SidebarHeader>
        <Icon v-if="!leftCollapsed" icon="lucide:layers" />
        <div class="mr-auto" data-sidebar-label>
          <strong>Typlog</strong>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarBody>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="(link, index) in links" :key="link.label">
              <SidebarMenuButton as-child :active="index === 0" :tooltip="link.label">
                <a href="#">
                  <Icon :icon="link.icon" />
                  <span>{{ link.label }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarBody>
      <SidebarFooter>
        <span class="grid size-8 shrink-0 place-items-center rounded-full bg-gray-4 text-sm">A</span>
        <span data-sidebar-label class="truncate text-sm">Ada Lovelace</span>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <header class="flex h-12 items-center gap-3 border-b border-gray-4 px-4">
        <strong>Overview</strong>
        <SidebarTrigger target="right" class="ml-auto" />
      </header>
      <div class="grid gap-4 p-4 sm:grid-cols-2">
        <div v-for="index in 4" :key="index" class="h-24 rounded-lg bg-gray-3"></div>
      </div>
    </SidebarInset>

    <Sidebar
      side="right"
      width="14rem"
      collapsible="offcanvas"
      mobile-title="Inspector"
      mobile-description="Edit page settings"
    >
      <SidebarHeader><strong data-sidebar-label>Inspector</strong></SidebarHeader>
      <SidebarBody class="flex flex-col gap-4 text-sm">
        <label data-sidebar-collapsed-hidden class="flex flex-col gap-1">
          <span class="text-gray-11">Title</span>
          <input value="Overview" class="rounded-md border border-gray-6 bg-transparent px-2 py-1.5" />
        </label>
        <label data-sidebar-collapsed-hidden class="flex flex-col gap-1">
          <span class="text-gray-11">Status</span>
          <select class="rounded-md border border-gray-6 bg-transparent px-2 py-1.5">
            <option>Published</option>
            <option>Draft</option>
          </select>
        </label>
      </SidebarBody>
      <SidebarRail />
    </Sidebar>
  </SidebarProvider>
</template>
