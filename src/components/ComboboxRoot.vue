<script lang="ts">
import { toRefs, type Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { ComboboxRootProps as _ComboboxRootProps, ComboboxRootEmits } from 'reka-ui'
import type { ColorType } from './types'

export interface ComboboxRootProps extends _ComboboxRootProps {
  size?: '1' | '2' | '3'
  color?: ColorType
  highContrast?: boolean
}

interface ComboboxRootContext {
  size: Ref<string>
  color: Ref<ColorType | undefined>
  highContrast: Ref<boolean>
}

export const [injectComboboxRootContext, provideComboboxRootContext]
  = createContext<ComboboxRootContext>('ui_ComboboxRoot')
</script>

<script setup lang="ts">
import { ComboboxRoot } from 'reka-ui'
import { useForwardPropsEmits } from './util'

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  variant: 'surface',
  size: '2',
})
const emits = defineEmits<ComboboxRootEmits>()
const { size, color, highContrast } = toRefs(props)

const forwarded = useForwardPropsEmits(props, emits, ['size', 'color', 'highContrast'])
provideComboboxRootContext({
  size,
  color,
  highContrast,
})
</script>

<template>
  <ComboboxRoot v-bind="forwarded">
    <slot></slot>
  </ComboboxRoot>
</template>
