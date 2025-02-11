<script lang="ts">
import type {
  DialogContentProps as _DialogContentProps,
  DialogContentEmits,
} from 'reka-ui'

export interface DialogContentProps extends _DialogContentProps {
  to?: string | HTMLElement
  align?: string
  class?: string
  size?: '1' | '2' | '3' | '4'
  width?: string
  minWidth?: string
  maxWidth?: string
  height?: string
  minHeight?: string
  maxHeight?: string
}
</script>

<script setup lang="ts">
import {
  DialogPortal,
  DialogContent,
  DialogOverlay,
} from 'reka-ui'
import { useForwardPropsEmits } from '../util'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogContentProps>(), {
  align: 'center',
  size: '3',
  maxWidth: '600px',
})
const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmits(props, emits, [
  'to', 'align', 'class', 'size',
  'width', 'minWidth', 'maxWidth',
  'height', 'minHeight', 'maxHeight',
])
</script>

<template>
  <DialogPortal :to="props.to">
    <DialogOverlay class="ui-DialogOverlay">
      <div class="ui-DialogScroll">
        <div
          class="ui-DialogScrollPadding"
          :data-align="props.align"
        >
          <DialogContent
            class="ui-DialogContent"
            :class="props.class"
            :data-size="props.size"
            v-bind="{
              ...$attrs,
              ...forwarded,
            }"
            :style="{
              width: props.width,
              height: props.height,
              minWidth: props.minWidth,
              maxWidth: props.maxWidth,
              minHeight: props.minHeight,
              maxHeight: props.maxHeight,
            }"
          >
            <slot></slot>
          </DialogContent>
        </div>
      </div>
    </DialogOverlay>
  </DialogPortal>
</template>

<style>
.ui-DialogOverlay {
  position: fixed;
  inset: 0;
}

.ui-DialogOverlay::before {
  position: fixed;
  content: '';
  inset: 0;
  background-color: var(--color-overlay);
}

.ui-DialogScroll {
  display: flex;
  overflow: auto;
  position: absolute;
  inset: 0;
}

.ui-DialogScrollPadding {
  flex-grow: 1;
  margin: auto;
  padding-top: var(--space-6);
  padding-bottom: max(var(--space-6), 6vh);
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

.ui-DialogScrollPadding[data-align="start"] {
  margin-top: 0;
}

.ui-DialogScrollPadding[data-align="center"] {
  margin-top: auto;
}

.ui-DialogContent {
  margin: auto;
  width: 100%;
  max-height: calc(100vh - var(--space-6) * 2);
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  text-align: left;

  --inset-padding-top: var(--dialog-content-padding);
  --inset-padding-right: var(--dialog-content-padding);
  --inset-padding-bottom: var(--dialog-content-padding);
  --inset-padding-left: var(--dialog-content-padding);
  padding: var(--dialog-content-padding);
  box-sizing: border-box;

  background-color: var(--color-panel-solid);
  box-shadow: var(--shadow-6);
  outline: none;
}

.ui-DialogContent[data-size="1"] {
  --dialog-content-padding: var(--space-3);
  border-radius: var(--radius-4);
}
.ui-DialogContent[data-size="2"] {
  --dialog-content-padding: var(--space-4);
  border-radius: var(--radius-4);
}
.ui-DialogContent[data-size="3"] {
  --dialog-content-padding: var(--space-5);
  border-radius: var(--radius-5);
}
.ui-DialogContent[data-size="4"] {
  --dialog-content-padding: var(--space-6);
  border-radius: var(--radius-5);
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes ui-dialog-overlay-no-op {
    from {
      opacity: 1;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes ui-dialog-content-show {
    from {
      opacity: 0;
      transform: translateY(5px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes ui-dialog-content-hide {
    from {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(5px) scale(0.99);
    }
  }

  .ui-DialogOverlay[data-state='closed'] {
    animation: ui-dialog-overlay-no-op 160ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ui-DialogOverlay[data-state='open']::before {
    animation: ui-fade-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ui-DialogOverlay[data-state='closed']::before {
    animation: ui-fade-out 160ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ui-DialogContent[data-state='open'] {
    animation: ui-dialog-content-show 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ui-DialogContent[data-state='closed'] {
    animation: ui-dialog-content-hide 100ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.ui-DialogContent > h2[id^="reka-dialog-title"] {
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-4);
  margin-bottom: var(--space-3);
}

.ui-DialogContent > p[id^="reka-dialog-description"] {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
}
</style>
