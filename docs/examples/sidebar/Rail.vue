<script setup lang="ts">
import {
  SidebarBody,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
  SidebarRoot,
} from '#components'
</script>

<template>
  <SidebarProvider class="h-72 overflow-hidden rounded-lg border border-gray-5">
    <SidebarRoot collapsible="icon" width="13rem">
      <SidebarContent>
        <SidebarHeader>
          <span class="grid size-7 shrink-0 place-items-center rounded bg-accent-9 text-white">T</span>
          <strong data-sidebar-label>Typlog</strong>
        </SidebarHeader>
        <SidebarBody class="text-sm text-gray-11">
          <span data-sidebar-label>Hover or focus the sidebar edge, then activate it.</span>
        </SidebarBody>
        <SidebarRail />
      </SidebarContent>
    </SidebarRoot>
    <SidebarInset class="p-4 text-sm text-gray-11">The rail is an accessible collapse control.</SidebarInset>
  </SidebarProvider>
</template>
