<script setup lang="ts">
import {
  Sidebar,
  SidebarBody,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@typlog/ui'
</script>

<template>
  <div class="grid gap-4">
    <SidebarProvider
      class="h-64 overflow-hidden rounded-lg border border-gray-5"
    >
      <Sidebar class="bg-gray-1" variant="floating" collapsible="offcanvas" width="10em">
        <SidebarHeader><strong>floating</strong></SidebarHeader>
        <SidebarBody class="text-sm text-gray-11">Sidebar panel</SidebarBody>
      </Sidebar>
      <SidebarInset>
        <header class="flex h-12 items-center gap-3 px-2">
          <SidebarTrigger />
          <strong>Overview</strong>
        </header>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
