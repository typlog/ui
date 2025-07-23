<script lang="ts">
import type {
  AlertDialogContentProps,
  AlertDialogContentEmits,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

export interface AlertDialogPopupProps extends AlertDialogContentProps {
  to?: string | HTMLElement
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

const props = defineProps<AlertDialogPopupProps>()
const emits = defineEmits<AlertDialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits, ['to', 'align', 'size'])
</script>

<template>
  <AlertDialogPortal :to="props.to">
    <ThemeWrapper>
      <AlertDialogOverlay class="ui-DialogOverlay">
        <div class="ui-DialogWrapper">
          <div class="ui-DialogContainer">
            <AlertDialogContent
              class="ui-DialogPopup ui-AlertPopup"
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

<style>
.ui-AlertPopup {
  --dialog-popup-radius: var(--radius-4);
  --dialog-popup-max-width: 450px;
  padding: var(--space-5);
}
</style>
