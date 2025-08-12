<script lang="ts">
import type { ToastProviderProps as RekaToastProviderProps } from 'reka-ui'

export interface ToastProviderProps extends RekaToastProviderProps {
  size?: '1' | '2' | '3'
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ToastProvider,
  ToastViewport,
  ToastPortal,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'
import { useForwardPropsWithout } from '../util'
import { useToastManager } from './manager'
import ToastItem from './ToastItem.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToastProviderProps>(), {
  size: '1',
  position: 'bottom-right',
})

const forwarded = useForwardPropsWithout(props, ['position', 'size'])
const { messages } = useToastManager()

const yPosition = computed(() => {
  return props.position.split('-')[0] as 'top' | 'bottom' | 'center'
})

const xPosition = computed(() => {
  return props.position.split('-')[1] as 'left' | 'right' | 'center'
})

const swipeDirection = computed(() => {
  if (props.swipeDirection) {
    return props.swipeDirection
  }
  if (xPosition.value !== 'center') {
    return xPosition.value
  }
  return yPosition.value === 'top' ? 'up' : 'down'
})
</script>

<template>
  <ToastProvider v-bind="{...forwarded, swipeDirection}">
    <slot></slot>
    <slot
      v-for="(msg, index) in messages"
      :key="msg.id"
      name="item"
      :message="msg"
      :index="index"
    >
      <ToastItem
        :key="msg.id"
        :message="msg"
        :index="index"
        :x-position="xPosition"
        :y-position="yPosition"
      />
    </slot>
    <ToastPortal>
      <ThemeWrapper>
        <ToastViewport
          class="ui-ToastViewport"
          v-bind="$attrs"
          :class="`r-size-${size}`"
          :data-x-position="xPosition"
          :data-y-position="yPosition"
        />
      </ThemeWrapper>
    </ToastPortal>
  </ToastProvider>
</template>

<style>
.ui-ToastViewport {
  position: fixed;
  margin: 0 auto;
  top: auto;
  left: auto;
  bottom: auto;
  right: auto;
  max-width: calc(100vw - var(--toast-x-position) - var(--space-4));
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  outline: none;
  width: var(--toast-width);
  --toast-x-position: var(--space-4);
  --toast-y-position: var(--space-4);
}
.ui-ToastViewport:where(.r-size-1) {
  --toast-width: 300px;
  --toast-gap: var(--space-2);
  --toast-title-font-size: var(--font-size-2);
  --toast-description-font-size: var(--font-size-1);
}
.ui-ToastViewport:where(.r-size-2) {
  --toast-width: 340px;
  --toast-gap: var(--space-3);
  --toast-title-font-size: var(--font-size-3);
  --toast-description-font-size: var(--font-size-1);
}
.ui-ToastViewport:where(.r-size-3) {
  --toast-width: 380px;
  --toast-gap: var(--space-4);
  --toast-title-font-size: var(--font-size-4);
  --toast-description-font-size: var(--font-size-3);
}
.ui-ToastViewport:where([data-x-position="left"]) {
  left: var(--toast-x-position);
}
.ui-ToastViewport:where([data-x-position="right"]) {
  right: var(--toast-x-position);
}
.ui-ToastViewport:where([data-x-position="center"]) {
  left: calc(50% - var(--toast-width) / 2);
}
.ui-ToastViewport:where([data-y-position="top"]) {
  top: var(--toast-y-position);
}
.ui-ToastViewport:where([data-y-position="bottom"]) {
  bottom: var(--toast-y-position);
}
</style>
