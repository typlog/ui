<script setup lang="ts">
import {
  Badge,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@typlog/ui'

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
    <Sidebar v-slot="{ collapsed, isMobile }" collapsible="icon">
      <SidebarHeader><strong v-if="isMobile || !collapsed">Publication</strong></SidebarHeader>
      <SidebarBody>
        <SidebarGroup v-for="group in groups" :key="group.label">
          <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="link in group.links"
              :key="link.label"
            >
              <SidebarMenuButton
                as="a"
                href="#"
                :active="link.label === 'Inbox'"
                :icon="link.icon"
                :text="link.label"
              >
                <template #trailing>
                  <Badge
                    v-if="link.count"
                  >
                    {{ link.count }}
                  </Badge>
                </template>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarBody>
    </Sidebar>
    <SidebarInset class="p-4"><SidebarTrigger /></SidebarInset>
  </SidebarProvider>
</template>
