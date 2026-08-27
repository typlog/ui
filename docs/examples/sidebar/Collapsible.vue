<script setup lang="ts">
import {
  Sidebar,
  SidebarBody,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '#components'

const modes = ['offcanvas', 'icon', 'none'] as const
</script>

<template>
  <div class="grid gap-4">
    <SidebarProvider
      v-for="mode in modes"
      :key="mode"
      class="h-64 overflow-hidden rounded-lg border border-gray-5"
    >
      <Sidebar :collapsible="mode" width="10rem">
        <SidebarHeader>
          <span class="grid size-7 shrink-0 place-items-center rounded bg-accent-9 text-white">T</span>
          <strong data-sidebar-label>{{ mode }}</strong>
        </SidebarHeader>
        <SidebarBody class="text-sm text-gray-11">
          <p data-sidebar-label>The sidebar uses the {{ mode }} collapse mode.</p>
        </SidebarBody>
      </Sidebar>
      <SidebarInset>
        <div class="flex items-center gap-2 p-3">
          <SidebarTrigger />
          <span class="text-sm">Toggle</span>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
