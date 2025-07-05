<script lang="ts">
import type {
  AlertDialogContentProps as _DialogContentProps,
  AlertDialogContentEmits,
} from 'reka-ui'
import { injectThemeContext } from '../ThemeProvider.vue'

export interface AlertDialogContentProps extends _DialogContentProps {
  to?: string | HTMLElement
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
  AlertDialogPortal,
  AlertDialogContent,
  AlertDialogOverlay,
} from 'reka-ui'
import { useForwardPropsEmits } from '../util'

defineOptions({
  inheritAttrs: false,
})

const theme = injectThemeContext()

const props = withDefaults(defineProps<AlertDialogContentProps>(), {
  size: '3',
  maxWidth: '450px',
})
const emits = defineEmits<AlertDialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits, [
  'to', 'align', 'class', 'size',
  'width', 'minWidth', 'maxWidth',
  'height', 'minHeight', 'maxHeight',
])
</script>

<template>
  <AlertDialogPortal :to="props.to">
    <AlertDialogOverlay
      class="ui-root ui-DialogOverlay"
      :data-accent-color="theme.accentColor.value"
      :data-gray-color="theme.grayColor.value"
      :data-radius="theme.radius.value"
      :data-scaling="theme.scaling.value"
    >
      <div class="ui-DialogWrapper">
        <div class="ui-DialogContainer">
          <AlertDialogContent
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
            <slot></slot>
          </AlertDialogContent>
        </div>
      </div>
    </AlertDialogOverlay>
  </AlertDialogPortal>
</template>
