<script lang="ts">
import { toRefs, ref, type Ref } from 'vue'
import { createContext } from 'reka-ui'
import type {
  AcceptableValue,
  ComboboxRootProps as _ComboboxRootProps,
  ComboboxRootEmits,
} from 'reka-ui'
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
  items: Ref<Map<AcceptableValue, string>>
}

export const [injectComboboxRootContext, provideComboboxRootContext]
  = createContext<ComboboxRootContext>('ui_ComboboxRoot')
</script>

<script setup lang="ts">
import { ComboboxRoot } from 'reka-ui'
import { extractForwardPropsEmits } from './util'

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  variant: 'surface',
  size: '2',
})
const emits = defineEmits<ComboboxRootEmits>()
const { size, color, highContrast } = toRefs(props)

const items = ref<Map<AcceptableValue, string>>(new Map())

const [forwarded, resetClass] = extractForwardPropsEmits(props, emits, ['size', 'color', 'highContrast'])
provideComboboxRootContext({
  size,
  color,
  highContrast,
  items,
})
</script>

<template>
  <ComboboxRoot
    class="ui-ComboboxRoot"
    :class="resetClass"
    v-bind="forwarded"
  >
    <slot></slot>
  </ComboboxRoot>
</template>
