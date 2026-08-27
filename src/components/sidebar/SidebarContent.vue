<script lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'

export interface SidebarContentProps extends DialogContentProps {
  /** Accessible title announced when the sidebar opens on mobile. @default "Navigation" */
  mobileTitle?: string
  /** Accessible description announced when the sidebar opens on mobile. @default "Site navigation" */
  mobileDescription?: string
}
</script>

<script setup lang="ts">
import { computed, nextTick } from 'vue'
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  Primitive,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'
import { useForwardPropsEmitsWithout } from '../util'
import { injectSidebarRootContext } from './SidebarRoot.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SidebarContentProps>(), {
  as: 'aside',
  mobileTitle: 'Navigation',
  mobileDescription: 'Site navigation',
})
const emits = defineEmits<DialogContentEmits>()
const context = injectSidebarRootContext()
const forwarded = useForwardPropsEmitsWithout(props, emits, ['mobileTitle', 'mobileDescription'])

const contentClass = computed(() => [
  `r-side-${context.side.value}`,
  `r-variant-${context.variant.value}`,
  `r-collapsible-${context.collapsible.value}`,
])
const contentStyle = computed(() => ({
  '--sidebar-width': context.width.value,
  '--sidebar-collapsed-width': context.collapsedWidth.value,
  '--sidebar-mobile-width': context.mobileWidth.value,
}))

function restoreTriggerFocus(event: Event) {
  if (event.defaultPrevented)
    return

  if (!context.shouldRestoreFocus()) {
    event.preventDefault()
    return
  }

  const trigger = context.lastTrigger.value
  if (trigger?.isConnected) {
    event.preventDefault()
    nextTick(() => trigger.focus())
  }
}
</script>

<template>
  <DialogPortal v-if="context.isMobile.value">
    <ThemeWrapper>
      <DialogOverlay class="ui-SidebarOverlay">
        <DialogContent
          v-bind="{ ...$attrs, ...forwarded }"
          :id="context.contentId"
          class="ui-SidebarContent r-mobile"
          :class="contentClass"
          :style="contentStyle"
          :data-side="context.side.value"
          :data-variant="context.variant.value"
          :data-collapsible="context.collapsible.value"
          :data-collapsed="context.collapsed.value"
          @close-auto-focus="restoreTriggerFocus"
        >
          <DialogTitle class="ui-SidebarVisuallyHidden">
            {{ props.mobileTitle }}
          </DialogTitle>
          <DialogDescription class="ui-SidebarVisuallyHidden">
            {{ props.mobileDescription }}
          </DialogDescription>
          <div class="ui-SidebarInner">
            <slot></slot>
          </div>
        </DialogContent>
      </DialogOverlay>
    </ThemeWrapper>
  </DialogPortal>

  <Primitive
    v-else
    v-bind="$attrs"
    :id="context.contentId"
    :as="props.as"
    :as-child="props.asChild"
    class="ui-SidebarContent r-desktop"
    :class="contentClass"
    :style="contentStyle"
    :data-side="context.side.value"
    :data-variant="context.variant.value"
    :data-collapsible="context.collapsible.value"
    :data-collapsed="context.collapsed.value"
  >
    <div class="ui-SidebarInner">
      <slot></slot>
    </div>
  </Primitive>
</template>
