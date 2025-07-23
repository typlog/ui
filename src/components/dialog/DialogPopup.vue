<script lang="ts">
import type {
  DialogContentProps,
  DialogContentEmits,
} from 'reka-ui'
import {
  DialogPortal,
  DialogContent,
  DialogOverlay,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

export interface DialogPopupProps extends DialogContentProps {
  to?: string | HTMLElement
  size?: '1' | '2' | '3' | '4' | '5'
}
</script>

<script setup lang="ts">
import { useForwardPropsEmitsWithout } from '../util'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogPopupProps>(), {
  size: '1',
})
const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmitsWithout(props, emits, [
  'to', 'align', 'class', 'size',
])
</script>

<template>
  <DialogPortal :to="props.to">
    <ThemeWrapper>
      <DialogOverlay class="ui-DialogOverlay">
        <div class="ui-DialogWrapper">
          <div class="ui-DialogContainer">
            <DialogContent
              class="ui-DialogPopup"
              :class="`r-size-${props.size}`"
              v-bind="{
                ...$attrs,
                ...forwarded,
              }"
            >
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

.ui-DialogPopup {
  width: 100%;
  max-height: calc(100vh - var(--space-6) * 2);
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  text-align: left;
  box-sizing: border-box;
  background-color: var(--color-panel-solid);
  outline: none;
  border-top-left-radius: var(--dialog-popup-radius);
  border-top-right-radius: var(--dialog-popup-radius);
  max-width: var(--dialog-popup-max-width);
  max-height: var(--dialog-popup-max-height);
}

.ui-DialogPopup:where(.r-size-1) {
  --dialog-popup-radius: var(--radius-4);
  --dialog-popup-max-width: 450px;
  --dialog-popup-max-height: calc(100vh - 100px);
}
.ui-DialogPopup:where(.r-size-2) {
  --dialog-popup-radius: var(--radius-4);
  --dialog-popup-max-width: 600px;
  --dialog-popup-max-height: calc(100vh - 100px);
}
.ui-DialogPopup:where(.r-size-3) {
  --dialog-popup-radius: var(--radius-5);
  --dialog-popup-max-width: 860px;
  --dialog-popup-max-height: calc(100vh - 100px);
}
.ui-DialogPopup:where(.r-size-4) {
  --dialog-popup-radius: var(--radius-5);
  --dialog-popup-max-width: 1200px;
  --dialog-popup-max-height: calc(100vh - 100px);
}
.ui-DialogPopup:where(.r-size-5) {
  --dialog-popup-radius: var(--radius-5);
  --dialog-popup-max-width: none;
  --dialog-popup-max-height: calc(100vh - 64px);
}

@media (min-width: 450px) {
  .ui-DialogContainer {
    justify-content: center;
    padding-bottom: max(var(--space-6), 6vh);
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }

  .ui-DialogPopup {
    box-shadow: var(--shadow-6);
    border-bottom-left-radius: var(--dialog-popup-radius);
    border-bottom-right-radius: var(--dialog-popup-radius);
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
      transform: translate3d(0, var(--space-6), 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes ui-dialog-content-hide {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, var(--space-5), 0);
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
  .ui-DialogPopup:where([data-state="open"]) {
    animation: ui-dialog-content-show 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ui-DialogPopup:where([data-state="closed"]) {
    animation: ui-dialog-content-hide 100ms linear;
  }
}
</style>
