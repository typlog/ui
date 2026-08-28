<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  Avatar,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@typlog/ui'

const links = [
  { label: 'Overview', icon: 'lucide:layout-dashboard' },
  { label: 'Posts', icon: 'lucide:file-text' },
  { label: 'Analytics', icon: 'lucide:chart-no-axes-column' },
  { label: 'Settings', icon: 'lucide:settings' },
]
</script>

<template>
  <SidebarProvider class="h-112 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar v-slot="{ collapsed, isMobile }" collapsible="icon" class="bg-gray-1">
      <SidebarHeader>
        <Icon v-if="isMobile || !collapsed" icon="lucide:layers" />
        <div v-if="isMobile || !collapsed" class="mr-auto">
          <strong>Typlog</strong>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarBody>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="(link, index) in links" :key="link.label">
              <SidebarMenuButton
                as="a"
                href="#"
                :active="index === 0"
                :icon="link.icon"
                :text="link.label"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarBody>
      <SidebarFooter>
        <SidebarMenu>
          <DropdownMenuRoot>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                aria-label="Open user menu"
                tooltip="Alex Lovelace"
                trailing-icon="lucide:chevrons-up-down"
              >
                <template #icon>
                  <Avatar
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                    alt="Alex"
                  />
                </template>
                <template #text>
                  <span class="block truncate text-sm font-medium text-gray-12">Alex Lovelace</span>
                  <span class="block truncate text-xs text-gray-10">alex@example.com</span>
                </template>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" :side-offset="8" class="w-48">
              <DropdownMenuItem>
                <Icon icon="lucide:user" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon="lucide:credit-card" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon="lucide:bell" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem color="red">
                <Icon icon="lucide:log-out" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuRoot>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <header class="flex h-12 items-center gap-3 border-b border-gray-4 px-4">
        <strong>Overview</strong>
        <SidebarTrigger target="right" class="ml-auto" />
      </header>
      <div class="grid gap-4 p-4 sm:grid-cols-2">
        <div v-for="index in 4" :key="index" class="h-24 rounded-lg bg-gray-3"></div>
      </div>
    </SidebarInset>

    <Sidebar
      side="right"
      width="14rem"
      collapsible="offcanvas"
      mobile-title="Inspector"
      mobile-description="Edit page settings"
    >
      <SidebarHeader><strong>Inspector</strong></SidebarHeader>
      <SidebarBody class="flex flex-col gap-4 text-sm">
        <label class="flex flex-col gap-1">
          <span class="text-gray-11">Title</span>
          <input value="Overview" class="rounded-md border border-gray-6 bg-transparent px-2 py-1.5" />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-gray-11">Status</span>
          <select class="rounded-md border border-gray-6 bg-transparent px-2 py-1.5">
            <option>Published</option>
            <option>Draft</option>
          </select>
        </label>
      </SidebarBody>
      <SidebarRail />
    </Sidebar>
  </SidebarProvider>
</template>
