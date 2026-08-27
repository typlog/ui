<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  Badge,
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

const sizes = [
  { value: '1', label: 'Compact' },
  { value: '2', label: 'Default' },
  { value: '3', label: 'Spacious' },
] as const
</script>

<template>
  <SidebarProvider class="h-112 overflow-hidden rounded-lg border border-gray-5">
    <SidebarRoot width="15rem" collapsible="none">
      <SidebarContent>
        <SidebarBody>
          <SidebarGroup v-for="size in sizes" :key="size.value">
            <SidebarGroupLabel>{{ size.label }} · size {{ size.value }}</SidebarGroupLabel>
            <SidebarMenu :size="size.value">
              <SidebarMenuItem>
                <SidebarMenuButton active>
                  <Icon icon="lucide:inbox" />
                  <span>Inbox</span>
                  <Badge>12</Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon icon="lucide:file-text" />
                  <span>Drafts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarBody>
      </SidebarContent>
    </SidebarRoot>
    <SidebarInset class="p-4 text-sm text-gray-11">
      Size is configured once for each menu tree.
    </SidebarInset>
  </SidebarProvider>
</template>
