<script lang="ts">
import type { Component, ComputedRef, Ref } from 'vue'
import type { AsTag } from 'reka-ui'
import { createContext } from 'reka-ui'

export interface SidebarProviderProps {
  /** The element or component used for the layout container. @default "div" */
  as?: AsTag | Component
  /** The viewport width in pixels at which the sidebar switches between mobile and desktop behavior. @default 1024 */
  breakpoint?: number
}

export interface SidebarController {
  side: Ref<'left' | 'right'>
  open: ComputedRef<boolean>
  collapsed: ComputedRef<boolean>
  collapsible: Ref<'offcanvas' | 'icon' | 'none'>
  variant: Ref<'default' | 'floating' | 'inset'>
  panelId: string
  lastTrigger: Ref<HTMLElement | null>
  setOpen: (value: boolean) => void
  toggle: () => void
}

export interface SidebarProviderContext {
  isNarrowViewport: Ref<boolean>
  sidebars: {
    left?: SidebarController
    right?: SidebarController
  }
  register: (side: 'left' | 'right', controller: SidebarController) => boolean
  unregister: (side: 'left' | 'right', controller: SidebarController) => void
  requestOpen: (side: 'left' | 'right', controller: SidebarController) => void
}

export const [injectSidebarProviderContext, provideSidebarProviderContext]
  = createContext<SidebarProviderContext>('ui:SidebarProvider')
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowReactive, watch } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarProviderProps>(), {
  as: 'div',
  breakpoint: 1024,
})
const isNarrowViewport = ref(false)
const sidebars = shallowReactive<SidebarProviderContext['sidebars']>({})

function register(side: 'left' | 'right', controller: SidebarController) {
  const existing = sidebars[side]
  if (existing && existing !== controller) {
    console.warn(`[Typlog UI] SidebarProvider accepts at most one Sidebar for side="${side}".`)
    return false
  }
  sidebars[side] = controller
  return true
}

function unregister(side: 'left' | 'right', controller: SidebarController) {
  if (sidebars[side] === controller)
    delete sidebars[side]
}

function requestOpen(side: 'left' | 'right', controller: SidebarController) {
  const other = sidebars[side === 'left' ? 'right' : 'left']
  if (other && other !== controller && other.open.value)
    other.setOpen(false)
}

provideSidebarProviderContext({ isNarrowViewport, sidebars, register, unregister, requestOpen })

let mediaQuery: MediaQueryList | undefined

function updateNarrowViewport(event: MediaQueryList | MediaQueryListEvent) {
  isNarrowViewport.value = event.matches
}

function setupMediaQuery() {
  mediaQuery?.removeEventListener('change', updateNarrowViewport)
  mediaQuery = window.matchMedia(`(max-width: ${props.breakpoint - 0.02}px)`)
  updateNarrowViewport(mediaQuery)
  mediaQuery.addEventListener('change', updateNarrowViewport)
}

onMounted(setupMediaQuery)

watch(() => props.breakpoint, () => {
  if (mediaQuery)
    setupMediaQuery()
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateNarrowViewport)
  mediaQuery = undefined
})

const hasInset = computed(() => sidebars.left?.variant.value === 'inset'
  || sidebars.right?.variant.value === 'inset')
const hasPadding = computed(() => sidebars.left?.variant.value === 'floating'
  || sidebars.right?.variant.value === 'floating'
  || hasInset.value)
</script>

<template>
  <Primitive
    class="ui-SidebarProvider"
    :as="props.as"
    :data-padded="hasPadding"
    :data-inset="hasInset"
    :data-mobile="isNarrowViewport"
  >
    <slot></slot>
  </Primitive>
</template>
