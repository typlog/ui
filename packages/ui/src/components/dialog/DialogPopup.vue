<script lang="ts">
import type {
  DialogContentProps,
  DialogContentEmits,
} from 'reka-ui'

export interface DialogPopupUI {
  overlay?: string
  wrapper?: string
  container?: string
  content?: string
}

export interface DialogPopupProps extends DialogContentProps {
  /**
   * Control size of the dialog. It will affect the padding and border-radius.
   * @default "1"
   */
  size?: '1' | '2' | '3' | '4' | '5'
  /** Classes for the component's stable visual parts. */
  ui?: DialogPopupUI
}
</script>

<script setup lang="ts">
import {
  DialogPortal,
  DialogContent,
  DialogOverlay,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'
import { useForwardPropsEmitsWithout } from '../util'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogPopupProps>(), {
  size: '1',
})
const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmitsWithout(props, emits, ['align', 'class', 'size', 'ui'])
</script>

<template>
  <DialogPortal>
    <ThemeWrapper>
      <DialogOverlay class="ui-DialogOverlay" :class="props.ui?.overlay">
        <div class="ui-DialogWrapper" :class="props.ui?.wrapper">
          <div class="ui-DialogContainer" :class="props.ui?.container">
            <DialogContent
              class="ui-DialogPopup"
              :class="[`r-size-${props.size}`, props.ui?.content]"
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

<style src="./style.css"></style>
