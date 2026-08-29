<script lang="ts">
import type { ComputedRef, Ref } from 'vue'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { createContext } from 'reka-ui'
import type { SidebarController } from './SidebarProvider.vue'

export interface SidebarProps extends DialogContentProps {
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
  /** Accessible title announced when the sidebar opens on mobile. @default "Navigation" */
  mobileTitle?: string
  /** Accessible description announced when the sidebar opens on mobile. @default "Site navigation" */
  mobileDescription?: string
}

export type SidebarEmits = DialogContentEmits & {
  /** Emitted when the mobile open state changes. */
  'update:open': [value: boolean]
  /** Emitted when the desktop collapsed state changes. */
  'update:collapsed': [value: boolean]
}

export interface SidebarContext {
  open: ComputedRef<boolean>
  collapsed: ComputedRef<boolean>
  isNarrowViewport: Ref<boolean>
  side: Ref<'left' | 'right'>
  variant: Ref<'default' | 'floating' | 'inset'>
  collapsible: Ref<'offcanvas' | 'icon' | 'none'>
  panelId: string
  lastTrigger: Ref<HTMLElement | null>
  toggle: () => void
  toggleCollapsed: () => void
  shouldRestoreFocus: () => boolean
}

export const [injectSidebarContext, provideSidebarContext]
  = createContext<SidebarContext>('ui:Sidebar')
</script>

<script setup lang="ts">
import { computed, nextTick, ref, toRefs, useId, watch } from 'vue'
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  Primitive,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'
import { buildPropsClass, useForwardPropsWithout } from '../util'
import { injectSidebarProviderContext } from './SidebarProvider.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SidebarProps>(), {
  as: 'aside',
  disableOutsidePointerEvents: undefined,
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
  mobileTitle: 'Navigation',
  mobileDescription: 'Site navigation',
})
const emits = defineEmits<SidebarEmits>()
defineSlots<{
  default?: (props: {
    /** Current mobile open state. */
    open: boolean
    /** Whether the currently rendered sidebar is visually collapsed. */
    collapsed: boolean
    /** Toggles the state appropriate for the current viewport. */
    toggle: () => void
  }) => any
}>()
const provider = injectSidebarProviderContext()

const internalOpen = ref(props.defaultOpen)
const internalCollapsed = ref(props.defaultCollapsed)
const isNarrowViewport = provider.isNarrowViewport
const lastTrigger = ref<HTMLElement | null>(null)
const panelId = `ui-sidebar-${useId()}`
const { side, variant, collapsible } = toRefs(props)

const open = computed({
  get: () => props.open ?? internalOpen.value,
  set: (value: boolean) => {
    if (value && isNarrowViewport.value)
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
const isVisuallyCollapsed = computed(() => !isNarrowViewport.value && collapsed.value)

function toggleCollapsed() {
  if (collapsible.value !== 'none')
    collapsed.value = !collapsed.value
}

function toggle() {
  if (isNarrowViewport.value)
    open.value = !open.value
  else
    toggleCollapsed()
}

function setOpen(value: boolean) {
  open.value = value
}

function shouldRestoreFocus() {
  const other = provider.sidebars[side.value === 'left' ? 'right' : 'left']
  return !other?.open.value
}

const controller: SidebarController = {
  side,
  open,
  collapsed,
  collapsible,
  variant,
  panelId,
  lastTrigger,
  setOpen,
  toggle,
}

watch(side, (value, _oldValue, onCleanup) => {
  if (provider.register(value, controller))
    onCleanup(() => provider.unregister(value, controller))
}, { immediate: true })

watch([open, isNarrowViewport], ([isOpen, narrowViewport]) => {
  if (isOpen && narrowViewport)
    provider.requestOpen(side.value, controller)
}, { immediate: true })

provideSidebarContext({
  open,
  collapsed,
  isNarrowViewport,
  side,
  variant,
  collapsible,
  panelId,
  lastTrigger,
  toggle,
  toggleCollapsed,
  shouldRestoreFocus,
})

const sidebarProps = [
  'open',
  'defaultOpen',
  'collapsed',
  'defaultCollapsed',
  'side',
  'variant',
  'collapsible',
  'width',
  'collapsedWidth',
  'mobileWidth',
  'mobileTitle',
  'mobileDescription',
]
const forwardedDialogProps = useForwardPropsWithout(props, sidebarProps)
const resetClass = buildPropsClass(props, ['side', 'variant', 'collapsible'])
const mobileClass = computed(() => [
  `r-side-${props.side}`,
  `r-variant-${props.variant}`,
])
const sidebarStyle = computed(() => ({
  '--sidebar-width': props.width,
  '--sidebar-collapsed-width': props.collapsedWidth,
  '--sidebar-mobile-width': props.mobileWidth,
}))

function closeAutoFocus(event: Event) {
  emits('closeAutoFocus', event)
  if (event.defaultPrevented)
    return

  if (!shouldRestoreFocus()) {
    event.preventDefault()
    return
  }

  const trigger = lastTrigger.value
  if (trigger?.isConnected) {
    event.preventDefault()
    nextTick(() => trigger.focus())
  }
}
</script>

<template>
  <DialogRoot :open="open" @update:open="setOpen">
    <div
      v-if="!isNarrowViewport"
      class="ui-Sidebar"
      :class="resetClass"
      :style="sidebarStyle"
      :data-collapsed="collapsed"
    >
      <Primitive
        v-bind="$attrs"
        :id="panelId"
        :as="props.as"
        :as-child="props.asChild"
        class="ui-SidebarPanel r-desktop"
      >
        <slot
          :open="open"
          :collapsed="isVisuallyCollapsed"
          :toggle="toggle"
        ></slot>
      </Primitive>
    </div>

    <DialogPortal v-else>
      <ThemeWrapper>
        <DialogOverlay class="ui-SidebarOverlay" :force-mount="props.forceMount">
          <DialogContent
            v-bind="{ ...$attrs, ...forwardedDialogProps }"
            :id="panelId"
            class="ui-SidebarPanel r-mobile"
            :class="mobileClass"
            :style="sidebarStyle"
            @close-auto-focus="closeAutoFocus"
            @escape-key-down="emits('escapeKeyDown', $event)"
            @focus-outside="emits('focusOutside', $event)"
            @interact-outside="emits('interactOutside', $event)"
            @open-auto-focus="emits('openAutoFocus', $event)"
            @pointer-down-outside="emits('pointerDownOutside', $event)"
          >
            <slot
              :open="open"
              :collapsed="isVisuallyCollapsed"
              :toggle="toggle"
            ></slot>
            <DialogTitle class="ui-SidebarVisuallyHidden">
              {{ props.mobileTitle }}
            </DialogTitle>
            <DialogDescription class="ui-SidebarVisuallyHidden">
              {{ props.mobileDescription }}
            </DialogDescription>
          </DialogContent>
        </DialogOverlay>
      </ThemeWrapper>
    </DialogPortal>
  </DialogRoot>
</template>

<style src="./style.css"></style>
