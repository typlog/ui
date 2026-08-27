<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  SidebarBody,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRoot,
} from '#components'

const menus = [
  { label: 'Editorial', color: 'blue', icon: 'lucide:notebook-pen' },
  { label: 'Audience', color: 'ruby', icon: 'lucide:users' },
] as const
</script>

<template>
  <SidebarProvider class="h-80 overflow-hidden rounded-lg border border-gray-5">
    <SidebarRoot width="15rem" collapsible="none">
      <SidebarContent>
        <SidebarBody>
          <SidebarGroup v-for="menu in menus" :key="menu.color">
            <SidebarGroupLabel>{{ menu.label }}</SidebarGroupLabel>
            <SidebarMenu :color="menu.color">
              <SidebarMenuItem>
                <SidebarMenuButton active>
                  <Icon :icon="menu.icon" />
                  <span>{{ menu.label }} overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon icon="lucide:settings" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarBody>
      </SidebarContent>
    </SidebarRoot>
    <SidebarInset class="p-4 text-sm text-gray-11">
      Active and focus states inherit each menu's accent color.
    </SidebarInset>
  </SidebarProvider>
</template>
