<script lang="ts">
import type {
  DialogContentProps as _DialogContentProps,
  DialogContentEmits,
} from 'reka-ui'
import {
  DialogPortal,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from 'reka-ui'
import { Icon } from '@iconify/vue'
import IconButton from '../button/IconButton.vue'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

export interface DialogContentProps extends _DialogContentProps {
  to?: string | HTMLElement
  size?: '1' | '2' | '3' | '4'
  width?: string
  minWidth?: string
  maxWidth?: string
  height?: string
  minHeight?: string
  maxHeight?: string
  closeIcon?: boolean
}
</script>

<script setup lang="ts">
import { useForwardPropsEmits } from '../util'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogContentProps>(), {
  size: '3',
  maxWidth: '600px',
})
const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmits(props, emits, [
  'to', 'align', 'class', 'size',
  'width', 'minWidth', 'maxWidth',
  'height', 'minHeight', 'maxHeight',
  'closeIcon',
])
</script>

<template>
  <DialogPortal :to="props.to">
    <ThemeWrapper>
      <DialogOverlay class="ui-DialogOverlay">
        <div class="ui-DialogWrapper">
          <div class="ui-DialogContainer">
            <DialogContent
              class="ui-DialogContent"
              :class="`r-size-${props.size}`"
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
              <IconButton
                v-if="props.closeIcon"
                class="ui-DialogContentClose"
                :as="DialogClose"
                type="button"
                variant="ghost"
                color="gray"
                aria-label="Close"
              >
                <Icon icon="lucide:x" />
              </IconButton>
              <slot></slot>
            </DialogContent>
          </div>
        </div>
      </DialogOverlay>
    </ThemeWrapper>
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

.ui-DialogWrapper {
  display: flex;
  overflow: hidden;
  position: absolute;
  inset: 0;
}

.ui-DialogContainer {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  padding-top: var(--space-6);
}

.ui-DialogContent {
  --inset-padding-top: var(--dialog-content-padding);
  --inset-padding-right: var(--dialog-content-padding);
  --inset-padding-bottom: var(--dialog-content-padding);
  --inset-padding-left: var(--dialog-content-padding);

  width: 100%;
  max-height: calc(100vh - var(--space-6) * 2);
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  text-align: left;
  padding: var(--dialog-content-padding);
  box-sizing: border-box;
  background-color: var(--color-panel-solid);
  outline: none;
  border-top-left-radius: var(--dialog-content-radius);
  border-top-right-radius: var(--dialog-content-radius);
}

.ui-DialogContent:where(.r-size-1) {
  --dialog-content-radius: var(--radius-4);
  --dialog-content-padding: var(--space-2);
}
.ui-DialogContent:where(.r-size-2) {
  --dialog-content-radius: var(--radius-4);
  --dialog-content-padding: var(--space-3);
}
.ui-DialogContent:where(.r-size-3) {
  --dialog-content-radius: var(--radius-5);
  --dialog-content-padding: var(--space-4);
}
.ui-DialogContent:where(.r-size-4) {
  --dialog-content-radius: var(--radius-5);
  --dialog-content-padding: var(--space-5);
}

.ui-DialogContentClose {
  position: absolute;
  top: calc(var(--dialog-content-padding) / 1.5);
  right: var(--dialog-content-padding);
}

@media (min-width: 520px) {
  .ui-DialogContainer {
    justify-content: center;
    padding-bottom: max(var(--space-6), 6vh);
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }

  .ui-DialogContent {
    box-shadow: var(--shadow-6);
    border-bottom-left-radius: var(--dialog-content-radius);
    border-bottom-right-radius: var(--dialog-content-radius);
  }
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
      opacity: 0.1;
      transform: translateY(var(--space-6));
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes ui-dialog-content-hide {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0.1;
      transform: translateY(var(--space-6));
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
  .ui-DialogOverlay[data-state='open'] :where(.ui-DialogContent) {
    animation: ui-dialog-content-show 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ui-DialogOverlay[data-state='closed'] :where(.ui-DialogContent) {
    animation: ui-dialog-content-hide 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}
</style>
