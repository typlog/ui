<script setup lang="ts">
import {
  SidebarBody,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
  SidebarRoot,
  SidebarTrigger,
} from '#components'
</script>

<template>
  <SidebarProvider class="h-72 overflow-hidden rounded-lg border border-gray-5">
    <SidebarInset class="p-4">
      <SidebarTrigger target="right" />
    </SidebarInset>
    <SidebarRoot side="right" collapsible="offcanvas" width="13rem">
      <SidebarContent>
        <SidebarHeader>
          <strong data-sidebar-label>Inspector</strong>
        </SidebarHeader>
        <SidebarBody class="text-sm text-gray-11">
          <span data-sidebar-label>Properties appear on the right.</span>
        </SidebarBody>
        <SidebarRail />
      </SidebarContent>
    </SidebarRoot>
  </SidebarProvider>
</template>
