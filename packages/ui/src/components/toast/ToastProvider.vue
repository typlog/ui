<script lang="ts">
import type { ToastProviderProps as RekaToastProviderProps } from 'reka-ui'
import type { ToastManager } from './manager'

export interface ToastProviderProps extends RekaToastProviderProps {
  /** The viewport width in pixels at which toast messages switch to a full-width mobile layout. @default 640 */
  breakpoint?: number
  size?: '1' | '2' | '3'
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
  /** An isolated toast manager. Defaults to the manager used by the global `toast` function. */
  manager?: ToastManager
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
  breakpoint: 640,
  size: '1',
  position: 'bottom-right',
})

const forwarded = useForwardPropsWithout(props, ['breakpoint', 'manager', 'position', 'size'])
const defaultManager = useToastManager()
const manager = computed(() => props.manager ?? defaultManager)
const messages = computed(() => manager.value.messages.value)
const isNarrowViewport = ref(false)

let mediaQuery: MediaQueryList | undefined

function updateNarrowViewport(event: MediaQueryList | MediaQueryListEvent) {
  isNarrowViewport.value = event.matches
}

function setupMediaQuery() {
  mediaQuery?.removeEventListener('change', updateNarrowViewport)
  mediaQuery = window.matchMedia(`(max-width: ${props.breakpoint - 0.02}px)`)
  updateNarrowViewport(mediaQuery)
  mediaQuery.addEventListener('change', updateNarrowViewport)
}

onMounted(setupMediaQuery)

watch(() => props.breakpoint, () => {
  if (mediaQuery)
    setupMediaQuery()
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', updateNarrowViewport)
  mediaQuery = undefined
})

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
  if (isNarrowViewport.value && yPosition.value !== 'center') {
    return yPosition.value === 'top' ? 'up' : 'down'
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
        :manager="manager"
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
          :data-mobile="isNarrowViewport"
        />
      </ThemeWrapper>
    </ToastPortal>
  </ToastProvider>
</template>

<style>
@layer components {
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
  .ui-ToastViewport:where([data-mobile="true"]) {
    left: var(--toast-x-position);
    right: var(--toast-x-position);
    width: auto;
    max-width: none;
  }
}
</style>
