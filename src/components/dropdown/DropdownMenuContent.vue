<script lang="ts">
import type { Ref } from 'vue'
import type {
  DropdownMenuContentProps as _DropdownMenuContentProps,
  DialogContentEmits,
} from 'reka-ui'
import { createContext } from 'reka-ui'
import { injectThemeContext } from '../ThemeProvider.vue'
import type { ColorType } from '../types'

export interface DropdownMenuContentProps extends _DropdownMenuContentProps {
  to?: string | HTMLElement
  size?: '1' | '2'
  variant?: 'solid' | 'soft'
  color?: ColorType
  highContrast?: boolean
}

interface DropdownMenuContentContext {
  color?: Ref<ColorType | undefined>
  size: Ref<'1' | '2' | '3'>
  variant: Ref<'solid' | 'soft'>
  highContrast?: Ref<boolean>
}

export const [injectDropdownMenuContentContext, provideDropdownMenuContentContext]
  = createContext<DropdownMenuContentContext>('ui_DropdownMenuContent')
</script>

<script setup lang="ts">
import { toRefs } from 'vue'
import {
  useForwardExpose,
  DropdownMenuPortal,
  DropdownMenuContent,
} from 'reka-ui'
import ScrollArea from '../scrollarea/ScrollArea.vue'
import { useForwardPropsEmits } from '../util'

defineOptions({
  inheritAttrs: false,
})

const theme = injectThemeContext()

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  size: '2',
  variant: 'solid',

  // defaults for dropdown menu content props
  align: 'start',
  sideOffset: 4,
  collisionPadding: 10,
})
const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmits(props, emits, [
  'to', 'size', 'variant', 'color', 'highContrast',
])

const { forwardRef } = useForwardExpose()
const { size, variant, color, highContrast } = toRefs(props)
provideDropdownMenuContentContext({ size, variant, color, highContrast })
</script>

<template>
  <DropdownMenuPortal :to="props.to">
    <DropdownMenuContent
      v-bind="{
        ...$attrs,
        ...forwarded,
      }"
      :ref="forwardRef"
      class="ui-root ui-PopperContent ui-MenuContent"
      :class="`r-size-${props.size}`"
      :data-accent-color="props.color || theme.accentColor.value"
      :data-gray-color="theme.grayColor.value"
      :data-radius="theme.radius.value"
      :data-scaling="theme.scaling.value"
    >
      <ScrollArea type="auto">
        <div class="ui-MenuViewport">
          <slot></slot>
        </div>
      </ScrollArea>
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<style>
.ui-MenuContent {
  --scrollarea-scrollbar-vertical-margin-top: var(--menu-content-padding);
  --scrollarea-scrollbar-vertical-margin-bottom: var(--menu-content-padding);
  --scrollarea-scrollbar-horizontal-margin-left: var(--menu-content-padding);
  --scrollarea-scrollbar-horizontal-margin-right: var(--menu-content-padding);

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  --menu-bg: var(--color-panel-solid);
  box-shadow: var(--shadow-5);
  background-color: var(--menu-bg);
}

.ui-MenuViewport {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: var(--menu-content-padding);
  box-sizing: border-box;
}

:where(.ui-MenuContent:has(.rt-ScrollAreaScrollbar[data-orientation='vertical'])) .ui-MenuViewport {
  padding-right: var(--space-3);
}

.ui-MenuContent:where(.r-size-1) {
  --menu-content-padding: var(--space-1);
  --menu-item-padding-left: calc(var(--space-5) / 1.2);
  --menu-item-padding-right: var(--space-2);
  --menu-item-height: var(--space-5);
  border-radius: var(--radius-3);
}

.ui-MenuContent:where(.r-size-2) {
  --menu-content-padding: var(--space-2);
  --menu-item-padding-left: var(--space-3);
  --menu-item-padding-right: var(--space-3);
  --menu-item-height: var(--space-6);
  border-radius: var(--radius-4);
}
</style>
