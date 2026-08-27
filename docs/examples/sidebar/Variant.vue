<script setup lang="ts">
import {
  SidebarBody,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRoot,
} from '#components'

const variants = ['default', 'floating', 'inset'] as const
</script>

<template>
  <div class="grid gap-4">
    <SidebarProvider
      v-for="variant in variants"
      :key="variant"
      class="h-64 overflow-hidden rounded-lg border border-gray-5"
    >
      <SidebarRoot :variant="variant" width="10rem" collapsible="none">
        <SidebarContent>
          <SidebarHeader><strong>{{ variant }}</strong></SidebarHeader>
          <SidebarBody class="text-sm text-gray-11">Sidebar panel</SidebarBody>
        </SidebarContent>
      </SidebarRoot>
      <SidebarInset class="p-3 text-sm text-gray-11">Main content</SidebarInset>
    </SidebarProvider>
  </div>
</template>
