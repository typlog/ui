<script setup lang="ts">
import {
  SidebarBody,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRoot,
  SidebarTrigger,
} from '#components'
</script>

<template>
  <SidebarProvider class="h-80 overflow-hidden rounded-lg">
    <SidebarRoot variant="inset" width="13rem">
      <SidebarContent>
        <SidebarHeader><strong>Typlog</strong></SidebarHeader>
        <SidebarBody class="text-sm text-gray-11">Inset navigation</SidebarBody>
      </SidebarContent>
    </SidebarRoot>
    <SidebarInset>
      <header class="flex h-12 items-center gap-2 border-b border-gray-4 px-4">
        <SidebarTrigger />
        <strong>Dashboard</strong>
      </header>
      <div class="p-4">
        <div class="h-40 rounded-lg bg-gray-3"></div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
