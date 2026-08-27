<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '#components'
</script>

<template>
  <SidebarProvider class="h-80 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar collapsible="icon" width="14rem">
      <SidebarBody>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            <CollapsibleRoot :as="SidebarMenuItem" default-open>
              <CollapsibleTrigger :as="SidebarMenuButton" tooltip="Projects">
                <Icon icon="lucide:folder" />
                <span>Projects</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton as-child active>
                      <a href="#">Typlog UI</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton as-child>
                      <a href="#">Documentation</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </CollapsibleRoot>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Members">
                <Icon icon="lucide:users" />
                <span>Members</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarBody>
    </Sidebar>
    <SidebarInset class="p-4"><SidebarTrigger /></SidebarInset>
  </SidebarProvider>
</template>
