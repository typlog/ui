<script lang="ts">
import { computed, type ComputedRef } from 'vue'
import { createContext } from 'reka-ui'
import type { ComboboxRootProps as _ComboboxRootProps, ComboboxRootEmits } from 'reka-ui'
import type { ColorType } from './types'

export interface ComboboxRootProps extends _ComboboxRootProps {
  size?: '1' | '2' | '3'
  color?: ColorType
  highContrast?: boolean
}

interface ComboboxRootContext {
  size: ComputedRef<string>
  color: ComputedRef<ColorType | undefined>
  highContrast: ComputedRef<boolean>
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

const forwarded = useForwardPropsEmits(props, emits, ['size', 'color', 'highContrast'])
provideComboboxRootContext({
  size: computed(() => props.size),
  color: computed(() => props.color),
  highContrast: computed(() => props.highContrast),
})
</script>

<template>
  <ComboboxRoot v-bind="forwarded">
    <slot></slot>
  </ComboboxRoot>
</template>
