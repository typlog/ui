<script lang="ts">
import type {
  AlertDialogContentProps as _DialogContentProps,
  AlertDialogContentEmits,
} from 'radix-vue'

export interface AlertDialogContentProps extends _DialogContentProps {
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
  AlertDialogPortal,
  AlertDialogContent,
  AlertDialogOverlay,
} from 'radix-vue'
import { useForwardPropsEmits } from './util'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AlertDialogContentProps>(), {
  align: 'center',
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
    <AlertDialogOverlay class="ui-DialogOverlay">
      <div class="ui-DialogScroll">
        <div
          class="ui-DialogScrollPadding"
          :data-align="props.align"
        >
          <AlertDialogContent
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
          </AlertDialogContent>
        </div>
      </div>
    </AlertDialogOverlay>
  </AlertDialogPortal>
</template>
