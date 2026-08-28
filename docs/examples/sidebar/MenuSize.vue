<script setup lang="ts">
import {
  Badge,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@typlog/ui'

const sizes = [
  { value: '1', label: 'Compact' },
  { value: '2', label: 'Default' },
  { value: '3', label: 'Spacious' },
] as const
</script>

<template>
  <SidebarProvider class="h-112 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar width="15rem" collapsible="none">
      <SidebarBody>
        <SidebarGroup v-for="size in sizes" :key="size.value">
          <SidebarGroupLabel>{{ size.label }} · size {{ size.value }}</SidebarGroupLabel>
          <SidebarMenu :size="size.value">
            <SidebarMenuItem>
              <SidebarMenuButton active icon="lucide:inbox" text="Inbox">
                <template #trailing><Badge>12</Badge></template>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon="lucide:file-text" text="Drafts" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarBody>
    </Sidebar>
    <SidebarInset class="p-4 text-sm text-gray-11">
      Size is configured once for each menu tree.
    </SidebarInset>
  </SidebarProvider>
</template>
