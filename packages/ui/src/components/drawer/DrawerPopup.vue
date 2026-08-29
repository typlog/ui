<script lang="ts">
import type { DrawerContentEmits, DrawerContentProps } from 'reka-ui'

export interface DrawerPopupUI {
  viewport?: string
  overlay?: string
  content?: string
  handle?: string
}

export interface DrawerPopupProps extends DrawerContentProps {
  /** Control the size of the drawer. @default "2" */
  size?: '1' | '2' | '3'
  /** Render a draggable handle. @default true */
  showHandle?: boolean
  /** Classes for the component's stable visual parts. */
  ui?: DrawerPopupUI
}
</script>

<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerViewport } from 'reka-ui'
import DrawerHandle from './DrawerHandle.vue'
import ThemeWrapper from '../provider/ThemeWrapper.vue'
import { useForwardPropsEmitsWithout } from '../util'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<DrawerPopupProps>(), { size: '2', showHandle: true })
const emits = defineEmits<DrawerContentEmits>()
const forwarded = useForwardPropsEmitsWithout(props, emits, ['size', 'showHandle', 'ui', 'class'])
</script>

<template>
  <DrawerPortal>
    <ThemeWrapper>
      <DrawerViewport class="ui-DrawerViewport" :class="props.ui?.viewport">
        <DrawerOverlay class="ui-DrawerOverlay" :class="props.ui?.overlay" />
        <DrawerContent
          class="ui-DrawerPopup ui-DrawerMotion"
          :class="[`r-size-${props.size}`, props.ui?.content]"
          v-bind="{ ...$attrs, ...forwarded }"
        >
          <DrawerHandle v-if="props.showHandle" :class="props.ui?.handle" />
          <slot />
        </DrawerContent>
      </DrawerViewport>
    </ThemeWrapper>
  </DrawerPortal>
</template>

<style src="./style.css"></style>
