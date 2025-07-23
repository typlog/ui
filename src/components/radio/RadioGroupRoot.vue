<script lang="ts">
import type { Ref } from 'vue'
import type { RadioGroupRootProps as _RadioGroupRootProps, RadioGroupRootEmits } from 'reka-ui'
import { createContext } from 'reka-ui'
import type { ColorType } from '../types'

export interface RadioGroupRootProps extends _RadioGroupRootProps {
  color?: ColorType
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'soft'
  highContrast?: boolean
}

interface RadioGroupRootContext {
  color?: Ref<ColorType | undefined>
  size: Ref<'1' | '2' | '3'>
  variant: Ref<'surface' | 'soft'>
  highContrast?: Ref<boolean>
}

export const [injectRadioGroupRootContext, provideRadioGroupRootContext]
  = createContext<RadioGroupRootContext>('ui:RadioGroupRoot')
</script>

<script setup lang="ts">
import { toRefs } from 'vue'
import { RadioGroupRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout } from '../util'

const emits = defineEmits<RadioGroupRootEmits>()

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  size: '2',
  variant: 'surface',
})
const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'size', 'variant', 'highContrast'])

const { size, variant, color, highContrast } = toRefs(props)

provideRadioGroupRootContext({ size, variant, color, highContrast })
</script>

<template>
  <RadioGroupRoot
    class="ui-RadioGroupRoot"
    v-bind="forwarded"
  >
    <slot></slot>
  </RadioGroupRoot>
</template>
