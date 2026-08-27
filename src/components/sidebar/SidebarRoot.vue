<script lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { SidebarController } from './SidebarProvider.vue'

export interface SidebarRootProps {
  /** Controls whether the mobile sidebar is open. */
  open?: boolean
  /** Initial mobile open state when `open` is uncontrolled. @default false */
  defaultOpen?: boolean
  /** Controls whether the desktop sidebar is collapsed. */
  collapsed?: boolean
  /** Initial desktop collapsed state when `collapsed` is uncontrolled. @default false */
  defaultCollapsed?: boolean
  /** The edge of the layout that contains the sidebar. @default "left" */
  side?: 'left' | 'right'
  /** The visual relationship between the sidebar and main content. @default "default" */
  variant?: 'default' | 'floating' | 'inset'
  /** The desktop collapse behavior. @default "offcanvas" */
  collapsible?: 'offcanvas' | 'icon' | 'none'
  /** The expanded desktop width. @default "16rem" */
  width?: string
  /** The desktop width when `collapsible="icon"`. @default "3.5rem" */
  collapsedWidth?: string
  /** The sidebar width below the mobile breakpoint. @default "18rem" */
  mobileWidth?: string
}

export interface SidebarRootEmits {
  /** Emitted when the mobile open state changes. */
  'update:open': [value: boolean]
  /** Emitted when the desktop collapsed state changes. */
  'update:collapsed': [value: boolean]
}

export interface SidebarRootContext {
  open: ComputedRef<boolean>
  collapsed: ComputedRef<boolean>
  isMobile: Ref<boolean>
  side: Ref<'left' | 'right'>
  variant: Ref<'default' | 'floating' | 'inset'>
  collapsible: Ref<'offcanvas' | 'icon' | 'none'>
  width: Ref<string>
  collapsedWidth: Ref<string>
  mobileWidth: Ref<string>
  contentId: string
  lastTrigger: Ref<HTMLElement | null>
  toggle: () => void
  toggleCollapsed: () => void
  shouldRestoreFocus: () => boolean
}

export const [injectSidebarRootContext, provideSidebarRootContext]
  = createContext<SidebarRootContext>('ui:SidebarRoot')
</script>

<script setup lang="ts">
import { computed, ref, toRefs, useId, watch } from 'vue'
import { DialogRoot } from 'reka-ui'
import { buildPropsClass } from '../util'
import { injectSidebarProviderContext } from './SidebarProvider.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SidebarRootProps>(), {
  open: undefined,
  defaultOpen: false,
  collapsed: undefined,
  defaultCollapsed: false,
  side: 'left',
  variant: 'default',
  collapsible: 'offcanvas',
  width: '16rem',
  collapsedWidth: '3.5rem',
  mobileWidth: '18rem',
})
const emits = defineEmits<SidebarRootEmits>()
const provider = injectSidebarProviderContext()

const internalOpen = ref(props.defaultOpen)
const internalCollapsed = ref(props.defaultCollapsed)
const isMobile = provider.isMobile
const lastTrigger = ref<HTMLElement | null>(null)
const contentId = `ui-sidebar-${useId()}`
const { side, variant, collapsible, width, collapsedWidth, mobileWidth } = toRefs(props)

const open = computed({
  get: () => props.open ?? internalOpen.value,
  set: (value: boolean) => {
    if (value && isMobile.value)
      provider.requestOpen(side.value, controller)
    if (props.open === undefined)
      internalOpen.value = value
    emits('update:open', value)
  },
})

const collapsed = computed({
  get: () => props.collapsed ?? internalCollapsed.value,
  set: (value: boolean) => {
    if (props.collapsed === undefined)
      internalCollapsed.value = value
    emits('update:collapsed', value)
  },
})

function toggleCollapsed() {
  if (collapsible.value !== 'none')
    collapsed.value = !collapsed.value
}

function toggle() {
  if (isMobile.value)
    open.value = !open.value
  else
    toggleCollapsed()
}

function setOpen(value: boolean) {
  open.value = value
}

function shouldRestoreFocus() {
  const other = provider.roots[side.value === 'left' ? 'right' : 'left']
  return !other?.open.value
}

const controller: SidebarController = {
  side,
  open,
  collapsed,
  collapsible,
  variant,
  contentId,
  lastTrigger,
  setOpen,
  toggle,
}

watch(side, (value, _oldValue, onCleanup) => {
  if (provider.register(value, controller))
    onCleanup(() => provider.unregister(value, controller))
}, { immediate: true })

watch([open, isMobile], ([isOpen, mobile]) => {
  if (isOpen && mobile)
    provider.requestOpen(side.value, controller)
}, { immediate: true })

provideSidebarRootContext({
  open,
  collapsed,
  isMobile,
  side,
  variant,
  collapsible,
  width,
  collapsedWidth,
  mobileWidth,
  contentId,
  lastTrigger,
  toggle,
  toggleCollapsed,
  shouldRestoreFocus,
})

const resetClass = buildPropsClass(props, ['side', 'variant', 'collapsible'])
const rootStyle = computed(() => ({
  '--sidebar-width': props.width,
  '--sidebar-collapsed-width': props.collapsedWidth,
  '--sidebar-mobile-width': props.mobileWidth,
}))
</script>

<template>
  <DialogRoot :open="open" @update:open="setOpen">
    <div
      v-bind="$attrs"
      class="ui-SidebarRoot"
      :class="resetClass"
      :style="rootStyle"
      :data-mobile="isMobile"
      :data-open="open"
      :data-collapsed="collapsed"
      :data-side="props.side"
      :data-variant="props.variant"
      :data-collapsible="props.collapsible"
    >
      <slot
        :open="open"
        :collapsed="collapsed"
        :is-mobile="isMobile"
        :toggle="toggle"
      ></slot>
    </div>
  </DialogRoot>
</template>

<style src="./style.css"></style>
