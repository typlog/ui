<script lang="ts">
import type {
  TooltipProviderProps,
  TooltipContentProps,
} from 'reka-ui'

export interface TooltipProps extends TooltipProviderProps, TooltipContentProps {
  to?: string | HTMLElement
  content?: string
}
</script>

<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'

const props = withDefaults(defineProps<TooltipProps>(), {
  maxWidth: '360px',
  side: 'top',
  sideOffset: 4,
  collisionPadding: 10,
})
</script>

<template>
  <TooltipProvider
    :delay-duration="props.delayDuration"
    :disable-closing-trigger="props.disableClosingTrigger"
    :disable-hoverable-content="props.disableHoverableContent"
    :disabled="props.disabled"
    :ignore-non-keyboard-focus="props.ignoreNonKeyboardFocus"
    :skip-delay-duration="props.skipDelayDuration"
  >
    <TooltipRoot>
      <TooltipTrigger
        :as="props.as"
        :as-child="props.asChild"
      >
        <slot></slot>
      </TooltipTrigger>
      <TooltipPortal :to="props.to">
        <TooltipContent
          class="ui-Tooltip"
          :align="props.align"
          :align-offset="props.alignOffset"
          :aria-label="props.ariaLabel"
          :arrow-padding="props.arrowPadding"
          :avoid-collisions="props.avoidCollisions"
          :collision-boundary="props.collisionBoundary"
          :collision-padding="props.collisionPadding"
          :hide-when-detached="props.hideWhenDetached"
          :side="props.side"
          :side-offset="props.sideOffset"
          :sticky="props.sticky"
        >
          <slot name="content">
            <p
              class="ui-TooltipText"
              v-text="props.content"
            ></p>
          </slot>
          <TooltipArrow class="ui-TooltipArrow" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style>
.ui-Tooltip {
  box-sizing: border-box;
  padding: var(--space-1) var(--space-2);
  background-color: var(--gray-12);
  border-radius: var(--radius-2);
  transform-origin: var(--radix-tooltip-content-transform-origin);
  animation-duration: 140ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
@media (prefers-reduced-motion: no-preference) {
  .ui-Tooltip:where([data-state='delayed-open']):where([data-side='top']) {
    animation-name: ui-slide-from-top, ui-fade-in;
  }
  .ui-Tooltip:where([data-state='delayed-open']):where([data-side='bottom']) {
    animation-name: ui-slide-from-bottom, ui-fade-in;
  }
  .ui-Tooltip:where([data-state='delayed-open']):where([data-side='left']) {
    animation-name: ui-slide-from-left, ui-fade-in;
  }
  .ui-Tooltip:where([data-state='delayed-open']):where([data-side='right']) {
    animation-name: ui-slide-from-right, ui-fade-in;
  }
}
.ui-TooltipText {
  color: var(--gray-1);
  user-select: none;
  cursor: default;
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
}
.ui-TooltipArrow {
  fill: var(--gray-12);
}
</style>
