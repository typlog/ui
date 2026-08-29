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
  <SidebarProvider :breakpoint="768" class="h-72 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar mobile-title="Workspace navigation" mobile-description="Choose a workspace section">
      <SidebarHeader><strong>Workspace</strong></SidebarHeader>
      <SidebarBody>
        <nav class="flex flex-col gap-2" aria-label="Workspace navigation">
          <a href="#" class="rounded px-2 py-1.5 text-sm hover:bg-gray-3">Projects</a>
          <a href="#" class="rounded px-2 py-1.5 text-sm hover:bg-gray-3">Team</a>
          <a href="#" class="rounded px-2 py-1.5 text-sm hover:bg-gray-3">Settings</a>
        </nav>
      </SidebarBody>
    </Sidebar>
    <SidebarInset class="p-4">
      <div class="flex items-center gap-3">
        <SidebarTrigger />
        <p class="text-sm text-gray-11">Below 768px this opens a modal slideover.</p>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
