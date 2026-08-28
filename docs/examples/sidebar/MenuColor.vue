<script setup lang="ts">
import {
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

const menus = [
  { label: 'Editorial', color: 'blue', icon: 'lucide:notebook-pen' },
  { label: 'Audience', color: 'ruby', icon: 'lucide:users' },
] as const
</script>

<template>
  <SidebarProvider class="h-80 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar width="15rem" collapsible="none">
      <SidebarBody>
        <SidebarGroup v-for="menu in menus" :key="menu.color">
          <SidebarGroupLabel>{{ menu.label }}</SidebarGroupLabel>
          <SidebarMenu :color="menu.color">
            <SidebarMenuItem>
              <SidebarMenuButton
                active
                :icon="menu.icon"
                :text="`${menu.label} overview`"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon="lucide:settings" text="Settings" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarBody>
    </Sidebar>
    <SidebarInset class="p-4 text-sm text-gray-11">
      Active and focus states inherit each menu's accent color.
    </SidebarInset>
  </SidebarProvider>
</template>
