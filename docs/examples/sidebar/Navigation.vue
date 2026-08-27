<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  Badge,
  SidebarBody,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRoot,
  SidebarTrigger,
} from '#components'

interface NavigationLink {
  label: string
  icon: string
  count?: number
}

interface NavigationGroup {
  label: string
  links: NavigationLink[]
}

const groups: NavigationGroup[] = [
  {
    label: 'Workspace',
    links: [
      { label: 'Inbox', icon: 'lucide:inbox', count: 12 },
      { label: 'Drafts', icon: 'lucide:file-pen', count: 3 },
    ],
  },
  {
    label: 'Manage',
    links: [
      { label: 'Members', icon: 'lucide:users' },
      { label: 'Settings', icon: 'lucide:settings' },
    ],
  },
]
</script>

<template>
  <SidebarProvider class="h-80 overflow-hidden rounded-lg border border-gray-5">
    <SidebarRoot collapsible="icon">
      <SidebarContent>
        <SidebarHeader><strong data-sidebar-label>Publication</strong></SidebarHeader>
        <SidebarBody>
          <SidebarGroup v-for="group in groups" :key="group.label">
            <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="link in group.links"
                :key="link.label"
              >
                <SidebarMenuButton
                  as-child
                  :active="link.label === 'Inbox'"
                  :tooltip="link.label"
                >
                  <a href="#">
                    <Icon :icon="link.icon" />
                    <span>{{ link.label }}</span>
                    <Badge
                      v-if="link.count"
                    >
                      {{ link.count }}
                    </Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarBody>
      </SidebarContent>
    </SidebarRoot>
    <SidebarInset class="p-4"><SidebarTrigger /></SidebarInset>
  </SidebarProvider>
</template>
