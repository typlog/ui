<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  SidebarBody,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
  SidebarRoot,
  SidebarTrigger,
} from '#components'

const open = ref(false)
const collapsed = ref(false)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Button size="1" variant="soft" @click="open = !open">Mobile open: {{ open }}</Button>
      <Button size="1" variant="soft" @click="collapsed = !collapsed">Desktop collapsed: {{ collapsed }}</Button>
    </div>
    <SidebarProvider class="h-72 overflow-hidden rounded-lg border border-gray-5">
      <SidebarRoot
        v-model:open="open"
        v-model:collapsed="collapsed"
        width="13rem"
      >
        <SidebarContent>
          <SidebarHeader><strong>Controlled</strong></SidebarHeader>
          <SidebarBody class="text-sm text-gray-11">Both states are owned by the parent.</SidebarBody>
        </SidebarContent>
      </SidebarRoot>
      <SidebarInset class="p-4">
        <SidebarTrigger />
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
