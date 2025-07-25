<script lang="ts">
import type {
  AlertDialogContentProps,
  AlertDialogContentEmits,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

export interface AlertDialogPopupProps extends AlertDialogContentProps {}
</script>

<script setup lang="ts">
import {
  AlertDialogPortal,
  AlertDialogContent,
  AlertDialogOverlay,
  useForwardPropsEmits,
} from 'reka-ui'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<AlertDialogPopupProps>()
const emits = defineEmits<AlertDialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AlertDialogPortal>
    <ThemeWrapper>
      <AlertDialogOverlay class="ui-DialogOverlay">
        <div class="ui-DialogWrapper">
          <div class="ui-DialogContainer">
            <AlertDialogContent
              class="ui-DialogPopup ui-AlertPopup r-size-3"
              v-bind="{
                ...$attrs,
                ...forwarded,
              }"
            >
              <slot></slot>
            </AlertDialogContent>
          </div>
        </div>
      </AlertDialogOverlay>
    </ThemeWrapper>
  </AlertDialogPortal>
</template>

<style src="./style.css"></style>

<style>
.ui-AlertPopup {
  --dialog-popup-radius: var(--radius-4);
  --dialog-popup-max-width: 450px;
}
</style>
