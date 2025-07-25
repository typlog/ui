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
  /**
   * Control size of the dialog. It will affect the padding and border-radius.
   * @default "1"
   */
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
const forwarded = useForwardPropsEmitsWithout(props, emits, ['align', 'class', 'size'])
</script>

<template>
  <DialogPortal>
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

<style src="./style.css"></style>
