<script setup lang="ts">
import {
  Sidebar,
  SidebarBody,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
} from '@typlog/ui'
</script>

<template>
  <SidebarProvider class="h-72 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar v-slot="{ collapsed, isMobile }" collapsible="icon" width="13rem">
      <SidebarHeader>
        <span class="grid size-7 shrink-0 place-items-center rounded bg-accent-9 text-white">T</span>
        <strong v-if="isMobile || !collapsed">Typlog</strong>
      </SidebarHeader>
      <SidebarBody class="text-sm text-gray-11">
        <span v-if="isMobile || !collapsed">Hover or focus the sidebar edge, then activate it.</span>
      </SidebarBody>
      <SidebarRail />
    </Sidebar>
    <SidebarInset class="p-4 text-sm text-gray-11">The rail is an accessible collapse control.</SidebarInset>
  </SidebarProvider>
</template>
