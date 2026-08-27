<script setup lang="ts">
import {
  Sidebar,
  SidebarBody,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
  SidebarTrigger,
} from '#components'
</script>

<template>
  <SidebarProvider class="h-72 overflow-hidden rounded-lg border border-gray-5">
    <SidebarInset class="p-4">
      <SidebarTrigger target="right" />
    </SidebarInset>
    <Sidebar side="right" collapsible="offcanvas" width="13rem">
      <SidebarHeader>
        <strong>Inspector</strong>
      </SidebarHeader>
      <SidebarBody class="text-sm text-gray-11">
        <span>Properties appear on the right.</span>
      </SidebarBody>
      <SidebarRail />
    </Sidebar>
  </SidebarProvider>
</template>
