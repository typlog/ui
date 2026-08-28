<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleIndicator,
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
} from '@typlog/ui'
</script>

<template>
  <SidebarProvider class="h-80 overflow-hidden rounded-lg border border-gray-5">
    <Sidebar collapsible="icon" width="14rem">
      <SidebarBody>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            <CollapsibleRoot :as="SidebarMenuItem" default-open>
              <CollapsibleTrigger as-child>
                <SidebarMenuButton
                  icon="lucide:folder"
                  text="Projects"
                >
                  <template #trailing><CollapsibleIndicator /></template>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton as="a" href="#" text="Typlog UI" active />
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton as="a" href="#" text="Documentation" />
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </CollapsibleRoot>
            <SidebarMenuItem>
              <SidebarMenuButton icon="lucide:users" text="Members" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarBody>
    </Sidebar>
    <SidebarInset class="p-4"><SidebarTrigger /></SidebarInset>
  </SidebarProvider>
</template>
