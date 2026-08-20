<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogRoot,
  DialogTitle,
  IconButton,
  PopoverPopup,
  PopoverRoot,
  PopoverTrigger,
  ScrollArea,
} from '#components'
import { Icon } from '@iconify/vue'
import type { NavSidebarItem, SidebarItem } from '../types'
import DocSidebar from './Sidebar.vue'
import DocOutline from './Outline.vue'

const props = defineProps<{
  sections: NavSidebarItem[]
  sidebar: SidebarItem[]
  title: string
}>()

const sidebarOpen = ref(false)
const outlineOpen = ref(false)
const sectionSwitchOpen = ref(false)
const selectedSectionLink = ref<string>()

const activeSection = computed(() => {
  return props.sections.find(section => section.link === selectedSectionLink.value)
    || props.sections.find(section => section.active)
    || props.sections[0]
})

const activeSidebar = computed(() => activeSection.value?.items || props.sidebar)

function getSectionKey(section?: NavSidebarItem) {
  return section?.link || section?.text || ''
}

function selectSection(section: NavSidebarItem) {
  selectedSectionLink.value = section.link
  sectionSwitchOpen.value = false
}

function closeSidebarOnNavigate(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('a')) {
    sidebarOpen.value = false
  }
}

function closeOutlineOnNavigate(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('a')) {
    outlineOpen.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-between h-12 gap-3 px-2 sm:px-4 lg:hidden border-t border-gray-a3">
    <DialogRoot v-model:open="sidebarOpen">
      <button
        type="button"
        class="flex h-9 min-w-0 flex-1 items-center gap-3 rounded-md text-left text-gray-11 transition-colors hover:bg-gray-a3 hover:text-gray-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
        aria-label="Open documentation menu"
        aria-controls="mobile-doc-sidebar"
        :aria-expanded="sidebarOpen"
        @click="sidebarOpen = true"
      >
        <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center">
          <Icon aria-hidden="true" class="h-5 w-5" icon="lucide:menu" />
        </span>
        <span class="flex min-w-0 flex-1 items-center gap-2 text-sm leading-5">
          <span v-if="activeSection" class="truncate font-medium text-gray-12">{{ activeSection.text }}</span>
          <span v-if="activeSection" aria-hidden="true" class="shrink-0 text-gray-10">›</span>
          <span class="truncate text-gray-11">{{ title }}</span>
        </span>
      </button>

      <DialogPopup
        id="mobile-doc-sidebar"
        class="mobile-doc-sidebar-dialog"
        size="5"
      >
        <div class="flex h-16 shrink-0 items-center justify-between border-b border-gray-a3 px-4">
          <DialogTitle class="truncate text-sm font-semibold">Typlog UI</DialogTitle>
          <DialogClose as-child>
            <IconButton
              variant="ghost"
              color="gray"
              aria-label="Close documentation menu"
            >
              <Icon aria-hidden="true" icon="lucide:x" />
            </IconButton>
          </DialogClose>
        </div>
        <DialogDescription class="sr-only">
          Browse documentation sections and pages.
        </DialogDescription>

        <div class="shrink-0 p-4">
          <PopoverRoot v-model:open="sectionSwitchOpen">
            <Button
              :as="PopoverTrigger"
              class="w-full justify-start"
              variant="soft"
              color="gray"
              size="3"
            >
              <Icon
                v-if="activeSection?.icon"
                aria-hidden="true"
                class="h-5 w-5 shrink-0 text-accent-10"
                :icon="activeSection.icon"
              />
              <span class="min-w-0 flex-1 text-left">
                <span class="block truncate text-base font-semibold text-gray-12">{{ activeSection?.text }}</span>
                <span class="block truncate text-xs text-gray-11">{{ activeSection?.items?.length || 0 }} pages</span>
              </span>
              <Icon aria-hidden="true" class="h-4 w-4 shrink-0 text-gray-10" icon="lucide:chevron-down" />
            </Button>

            <PopoverPopup class="mobile-doc-section-popup w-[calc(100vw-2rem)] max-w-[21rem] p-1.5" size="1">
              <button
                v-for="section in sections"
                :key="getSectionKey(section)"
                class="flex min-h-14 w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-gray-a3 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent-8)]"
                :class="getSectionKey(section) === getSectionKey(activeSection) ? 'mobile-doc-section-option-active' : ''"
                type="button"
                :aria-current="getSectionKey(section) === getSectionKey(activeSection) ? 'page' : undefined"
                @click="selectSection(section)"
              >
                <Icon
                  v-if="section.icon"
                  aria-hidden="true"
                  class="h-5 w-5 shrink-0 text-gray-11"
                  :icon="section.icon"
                />
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-semibold text-gray-12">{{ section.text }}</span>
                  <span class="block truncate text-xs text-gray-11">{{ section.items?.length || 0 }} pages</span>
                </span>
                <Icon
                  v-if="getSectionKey(section) === getSectionKey(activeSection)"
                  aria-hidden="true"
                  class="h-4 w-4 shrink-0 text-accent-10"
                  icon="lucide:check"
                />
              </button>
            </PopoverPopup>
          </PopoverRoot>
        </div>

        <ScrollArea class="min-h-0 flex-1 px-4 py-3" scrollbars="vertical">
          <nav
            aria-label="Current documentation section"
            @click.capture="closeSidebarOnNavigate"
          >
            <DocSidebar :sidebar="activeSidebar" />
          </nav>
        </ScrollArea>
      </DialogPopup>
    </DialogRoot>

    <PopoverRoot v-model:open="outlineOpen">
      <Button
        :as="PopoverTrigger"
        class="shrink-0"
        variant="ghost"
        color="gray"
        size="2"
        aria-label="Open table of contents"
      >
        <Icon aria-hidden="true" class="h-4 w-4" icon="lucide:list" />
        On this page
      </Button>

      <PopoverPopup class="mobile-doc-outline-popup w-64 max-w-[calc(100vw-2rem)] p-3" size="2">
        <span class="sr-only">
          Jump to a section in this page.
        </span>
        <nav aria-label="Table of contents" @click.capture="closeOutlineOnNavigate">
          <DocOutline collapsible />
        </nav>
      </PopoverPopup>
    </PopoverRoot>
  </div>
</template>

<style>
.mobile-doc-sidebar-dialog {
  --dialog-popup-max-width: min(23rem, 100vw);
  --dialog-popup-max-height: 100vh;
  width: min(23rem, 100vw);
  height: 100vh;
  max-height: 100vh;
  margin-right: auto;
  border-radius: 0;
  padding: 0;
}

.ui-DialogContainer:has(.mobile-doc-sidebar-dialog) {
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
}

.mobile-doc-outline-popup {
  max-height: min(22rem, calc(100vh - var(--docs-chrome-height) - 1rem));
  overflow-y: auto;
}

.mobile-doc-section-option-active {
  background-color: var(--accent-a3);
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes mobile-doc-sidebar-in {
    from { transform: translate3d(-100%, 0, 0); }
    to { transform: translate3d(0, 0, 0); }
  }

  @keyframes mobile-doc-sidebar-out {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-100%, 0, 0); }
  }

  .mobile-doc-sidebar-dialog[data-state='open'] {
    animation: mobile-doc-sidebar-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mobile-doc-sidebar-dialog[data-state='closed'] {
    animation: mobile-doc-sidebar-out 160ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}
</style>
