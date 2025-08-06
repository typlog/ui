<script lang="ts">
import type { TooltipContentProps } from 'reka-ui'
import type { ColorType } from '../types'

export interface TooltipProps extends TooltipContentProps {
  /** The content associated with the tooltip. */
  content?: string
  /**
   * The max width of the tooltip popup.
   * @default "360px"
   */
  maxWidth?: string
  /** Background color of the tooltip popup.
   * @default "gray"
   */
  color?: ColorType
}
</script>

<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

const props = withDefaults(defineProps<TooltipProps>(), {
  maxWidth: '360px',
  side: 'top',
  sideOffset: 4,
  collisionPadding: 10,
  avoidCollisions: true,
  color: 'gray',
})

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger
      :as="props.as"
      :as-child="props.asChild"
      v-bind="$attrs"
    >
      <slot></slot>
    </TooltipTrigger>
    <TooltipPortal>
      <ThemeWrapper>
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
          :data-accent-color="props.color"
          :style="{maxWidth: props.maxWidth}"
        >
          <slot name="content">
            <p
              class="ui-TooltipText"
              v-text="props.content"
            ></p>
          </slot>
          <TooltipArrow class="ui-TooltipArrow" />
        </TooltipContent>
      </ThemeWrapper>
    </TooltipPortal>
  </TooltipRoot>
</template>

<style>
.ui-Tooltip {
  box-sizing: border-box;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-2);
  transform-origin: var(--reka-tooltip-content-transform-origin);
  animation-duration: 140ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--accent-11);
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
  fill: var(--accent-11);
}

/* special handle for gray color */
.ui-Tooltip:where([data-accent-color="gray"]) {
  background-color: var(--gray-12);
}
.ui-Tooltip:where([data-accent-color="gray"]) :where(.ui-TooltipArrow) {
  fill: var(--gray-12);
}
</style>
