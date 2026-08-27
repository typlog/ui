<script lang="ts">
import type { Component, ComputedRef, Ref } from 'vue'
import type { AsTag } from 'reka-ui'
import { createContext } from 'reka-ui'

export interface SidebarProviderProps {
  /** The element or component used for the layout container. @default "div" */
  as?: AsTag | Component
}

export interface SidebarController {
  side: Ref<'left' | 'right'>
  open: ComputedRef<boolean>
  collapsed: ComputedRef<boolean>
  collapsible: Ref<'offcanvas' | 'icon' | 'none'>
  variant: Ref<'default' | 'floating' | 'inset'>
  contentId: string
  lastTrigger: Ref<HTMLElement | null>
  setOpen: (value: boolean) => void
  toggle: () => void
}

export interface SidebarProviderContext {
  isMobile: Ref<boolean>
  roots: {
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
import { computed, onBeforeUnmount, onMounted, ref, shallowReactive } from 'vue'
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarProviderProps>(), { as: 'div' })
const isMobile = ref(false)
const roots = shallowReactive<SidebarProviderContext['roots']>({})

function register(side: 'left' | 'right', controller: SidebarController) {
  const existing = roots[side]
  if (existing && existing !== controller) {
    console.warn(`[Typlog UI] SidebarProvider accepts at most one SidebarRoot for side="${side}".`)
    return false
  }
  roots[side] = controller
  return true
}

function unregister(side: 'left' | 'right', controller: SidebarController) {
  if (roots[side] === controller)
    delete roots[side]
}

function requestOpen(side: 'left' | 'right', controller: SidebarController) {
  const other = roots[side === 'left' ? 'right' : 'left']
  if (other && other !== controller && other.open.value)
    other.setOpen(false)
}

provideSidebarProviderContext({ isMobile, roots, register, unregister, requestOpen })

let mediaQuery: MediaQueryList | undefined

function updateMobile(event: MediaQueryList | MediaQueryListEvent) {
  isMobile.value = event.matches
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 1023.98px)')
  updateMobile(mediaQuery)
  mediaQuery.addEventListener('change', updateMobile)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateMobile)
})

const hasInset = computed(() => roots.left?.variant.value === 'inset'
  || roots.right?.variant.value === 'inset')
</script>

<template>
  <Primitive
    class="ui-SidebarProvider"
    :as="props.as"
    :data-mobile="isMobile"
    :data-inset="hasInset"
  >
    <slot :is-mobile="isMobile"></slot>
  </Primitive>
</template>
