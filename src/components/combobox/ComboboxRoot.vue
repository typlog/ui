<script lang="ts">
import { toRefs, type Ref } from 'vue'
import { createContext } from 'reka-ui'
import type {
  ComboboxRootProps as _ComboboxRootProps,
  ComboboxRootEmits,
} from 'reka-ui'
import type { ColorType } from '../types'

export interface ComboboxRootProps extends _ComboboxRootProps {
  size?: '1' | '2' | '3'
  color?: ColorType
  highContrast?: boolean
}

interface ComboboxRootContext {
  size: Ref<'1' | '2' | '3'>
  color: Ref<ColorType | undefined>
  highContrast: Ref<boolean>
}

export const [injectComboboxRootContext, provideComboboxRootContext]
  = createContext<ComboboxRootContext>('ui:ComboboxRoot')
</script>

<script setup lang="ts">
import { ComboboxRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  multiple: false,
  size: '2',
})
const emits = defineEmits<ComboboxRootEmits>()
const { size, color, highContrast } = toRefs(props)

const forwarded = useForwardPropsEmitsWithout(props, emits, ['size', 'color', 'highContrast'])
const resetClass = buildPropsClass(props, ['size', 'highContrast'])

provideComboboxRootContext({
  size,
  color,
  highContrast,
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
