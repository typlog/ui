<script lang="ts">
import type {
  AlertDialogContentProps as _DialogContentProps,
  AlertDialogContentEmits,
} from 'radix-vue'

export interface AlertDialogContentProps extends _DialogContentProps {
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

const props = withDefaults(defineProps<AlertDialogContentProps>(), {
  align: 'center',
  size: '3',
  maxWidth: '450px',
})
const emits = defineEmits<AlertDialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits, [
  'align', 'class', 'size', 'width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight',
])
</script>

<template>
  <AlertDialogPortal>
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
              width: forwarded.width,
              height: forwarded.height,
              minWidth: forwarded.minWidth,
              maxWidth: forwarded.maxWidth,
              minHeight: forwarded.minHeight,
              maxHeight: forwarded.maxHeight,
            }"
          >
            <slot></slot>
          </AlertDialogContent>
        </div>
      </div>
    </AlertDialogOverlay>
  </AlertDialogPortal>
</template>
