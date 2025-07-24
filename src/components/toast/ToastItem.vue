<script lang="ts">
import type { ColorType } from '../types'
import type { ToastMessage, MessageCategory } from './manager'
import { useToastManager } from './manager'

export interface ToastItemProps {
  yPosition: 'top' | 'bottom'
  xPosition: 'left' | 'right'
  message: ToastMessage
  index: number
}

const CATEGORY_ICONS: Record<MessageCategory, string> = {
  loading: 'svg-spinners:bars-rotate-fade',
  info: 'ri:information-2-fill',
  success: 'ri:checkbox-circle-fill',
  warning: 'ri:alert-fill',
  error: 'ri:error-warning-fill',
}
const CATEGORY_COLORS: Record<MessageCategory, ColorType> = {
  loading: 'gray',
  info: 'indigo',
  success: 'green',
  warning: 'amber',
  error: 'red',
}
</script>

<script setup lang="ts">
import { computed, ref, useTemplateRef, onMounted } from 'vue'
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
} from 'reka-ui'
import { Icon } from '@iconify/vue'
import Button from '../button/Button.vue'

const props = defineProps<ToastItemProps>()
const toastRef = useTemplateRef<InstanceType<typeof ToastRoot>>('toastRef')
const paused = ref(false)

const state = useToastManager()

const styleVars = computed(() => {
  const heights = state.messages.value.slice(0, props.index).map(item => item.height || 60)
  const offsetY = heights.reduce((sum, num) => sum + num, 0)
  return {'--toast-index': props.index, '--toast-offset-y': offsetY + 'px'}
})

const categoryIcon = computed(() => {
  if (props.message.category) {
    return CATEGORY_ICONS[props.message.category]
  } else {
    return ''
  }
})

const categoryColor = computed(() => {
  if (props.message.category) {
    return CATEGORY_COLORS[props.message.category]
  } else {
    return undefined
  }
})

const onOpenChange = (open: boolean) => {
  if (open === false) {
    setTimeout(() => {
      state.remove(props.message.id)
    }, 500)
  }
}

const onPause = () => {
  paused.value = true
}

const onResume = () => {
  paused.value = false
}

onMounted(() => {
  const el = toastRef.value!.$el as HTMLLIElement
  state.update(props.message.id, {height: el.clientHeight})
})
</script>

<template>
  <ToastRoot
    ref="toastRef"
    :key="message.id"
    class="ui-ToastItem"
    :duration="message.duration"
    :data-expanded="paused"
    :data-invisible="index > 2"
    :style="styleVars"
    @update:open="onOpenChange"
    @pause="onPause"
    @resume="onResume"
  >
    <div
      v-if="message.category"
      class="ui-ToastIcon"
      :data-accent-color="categoryColor"
    >
      <Icon :icon="categoryIcon" />
    </div>
    <div class="ui-ToastContent">
      <ToastTitle class="ui-ToastTitle">{{ message.title }}</ToastTitle>
      <ToastDescription
        v-if="message.description"
        class="ui-ToastDescription"
      >
        {{ message.description }}
      </ToastDescription>
    </div>
    <ToastAction
      v-if="message.action"
      class="ui-ToastAction"
      :alt-text="message.action.altText || message.action.label"
      as-child
      @click="message.action.onClick"
    >
      <Button
        :variant="message.action.variant || 'soft'"
        :radius="message.action.radius"
        :size="message.action.size || '1'"
        :color="message.action.color"
      >
        {{ message.action.label }}
      </Button>
    </ToastAction>
  </ToastRoot>
</template>

<style>
.ui-ToastItem {
  position: absolute;
  display: flex;
  align-items: center;
  gap: var(--toast-gap);
  left: auto;
  right: auto;
  bottom: auto;
  top: auto;
  width: 100%;
  background: var(--color-panel-solid);
  box-shadow: 0 4px 12px var(--gray-a4);
  border: 1px solid var(--gray-a3);
  border-radius: var(--radius-3);
  padding: var(--space-4);
  opacity: 1;
  z-index: calc(0 - var(--toast-index));
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s;
  --toast-collapse-scale: calc(max(0, 1 - (var(--toast-index) * 0.06)));
}

.ui-ToastItem:where([data-invisible="true"]) {
  opacity: 0;
}

.ui-ToastItem:where([data-swipe="move"]) {
  transition: none;
}

:where(.ui-ToastViewport[data-x-position="left"]) .ui-ToastItem {
  left: 0;
}
:where(.ui-ToastViewport[data-x-position="right"]) .ui-ToastItem {
  right: 0;
}

:where(.ui-ToastViewport[data-y-position="top"]) .ui-ToastItem {
  top: 0;
  --toast-expanded-offset-y: calc(var(--toast-offset-y) + var(--toast-index) * var(--toast-gap) + var(--reka-toast-swipe-move-y, 0px));
}

:where(.ui-ToastViewport[data-y-position="bottom"]) .ui-ToastItem {
  bottom: 0;
  --toast-expanded-offset-y: calc(var(--toast-offset-y) * -1 + var(--toast-index) * var(--toast-gap) * -1 + var(--reka-toast-swipe-move-y, 0px));
}

:where(.ui-ToastViewport[data-y-position="top"]) .ui-ToastItem:where([data-expanded="false"]) {
  transform:
    translateX(var(--reka-toast-swipe-move-x, 0px))
    translateY(calc(var(--reka-toast-swipe-move-y, 0px) + (min(var(--toast-index), 10) * 20%)))
    scale(var(--toast-collapse-scale));
}

:where(.ui-ToastViewport[data-y-position="bottom"]) .ui-ToastItem:where([data-expanded="false"]) {
  transform:
    translateX(var(--reka-toast-swipe-move-x, 0px))
    translateY(calc(var(--reka-toast-swipe-move-y, 0px) + (min(var(--toast-index), 10) * -20%)))
    scale(var(--toast-collapse-scale));
}

.ui-ToastItem:where([data-expanded="true"]) {
  transform: translateX(var(--reka-toast-swipe-move-x, 0px)) translateY(var(--toast-expanded-offset-y));
}

.ui-ToastItem:where([data-swipe-direction="left"]) {
  --toast-item-swipe-to-x: calc(0 - 100% - var(--toast-x-position))
}

.ui-ToastItem:where([data-swipe-direction="right"]) {
  --toast-item-swipe-to-x: calc(100% + var(--toast-x-position))
}

.ui-ToastItem:where([data-swipe-direction="top"]) {
  --toast-item-swipe-to-y: calc(0 - 100% - var(--toast-y-position))
}

.ui-ToastItem:where([data-swipe-direction="bottom"]) {
  --toast-item-swipe-to-y: calc(100% + var(--toast-y-position))
}

.ui-ToastItem:where([data-swipe="closed"]) {
  animation: ui-fade-out 100ms ease-in;
}

.ui-ToastItem:where([data-swipe-direction="left"][data-swipe="end"]),
.ui-ToastItem:where([data-swipe-direction="right"][data-swipe="end"]) {
  animation: toast-swipe-x 100ms ease-out;
}

.ui-ToastItem:where([data-swipe-direction="top"][data-swipe="end"]),
.ui-ToastItem:where([data-swipe-direction="bottom"][data-swipe="end"]) {
  animation: toast-swipe-y 100ms ease-out;
}

@keyframes toast-swipe-x {
  from {
    transform: translateX(var(--reka-toast-swipe-end-x)) translateY(var(--toast-expanded-offset-y));
  }
  to {
    transform: translateX(var(--toast-item-swipe-to-x)) translateY(var(--toast-expanded-offset-y));
  }
}

@keyframes toast-swipe-y {
  from {
    transform: translateY(var(--reka-toast-swipe-end-y));
  }
  to {
    transform: translateY(var(--toast-item-swipe-to-y));
  }
}

.ui-ToastContent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.ui-ToastIcon {
  display: inline-flex;
  align-items: center;
  font-size: calc(var(--toast-title-font-size) + 4px);
  color: var(--accent-a9);
}
.ui-ToastIcon {
  vertical-align: middle;
}
.ui-ToastTitle {
  font-size: var(--toast-title-font-size);
  font-weight: var(--font-weight-medium);
}
.ui-ToastDescription {
  font-size: var(--toast-description-font-size);
  color: var(--gray-10);
}
</style>
