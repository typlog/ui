<script lang="ts">
import { toRefs, type Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { SelectRootProps as _SelectRootProps, SelectRootEmits } from 'reka-ui'
import type { ColorType } from './types'

export interface SelectRootProps extends _SelectRootProps {
  size?: '1' | '2' | '3'
  color?: ColorType
  highContrast?: boolean
}

interface SelectRootContext {
  size: Ref<string>
  color: Ref<ColorType | undefined>
  highContrast: Ref<boolean>
}

export const [injectSelectRootContext, provideSelectRootContext]
  = createContext<SelectRootContext>('ui_SelectRoot')
</script>

<script setup lang="ts">
import { SelectRoot } from 'reka-ui'
import { useForwardPropsEmits } from './util'

const props = withDefaults(defineProps<SelectRootProps>(), {
  size: '2',
})
const emits = defineEmits<SelectRootEmits>()
const { size, color, highContrast } = toRefs(props)

const forwarded = useForwardPropsEmits(props, emits, ['size', 'color', 'highContrast'])

provideSelectRootContext({
  size,
  color,
  highContrast,
})
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <slot></slot>
  </SelectRoot>
</template>
