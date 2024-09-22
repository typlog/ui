<script lang="ts">
import type { Ref } from 'vue'
import type { RadioGroupRootProps as _RadioGroupRootProps, RadioGroupRootEmits } from 'radix-vue'
import { createContext } from 'radix-vue'
import type { ColorType } from './types'

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
  = createContext<RadioGroupRootContext>('ui_RadioGroupRoot')
</script>

<script setup lang="ts">
import { toRefs } from 'vue'
import { RadioGroupRoot, useForwardPropsEmits } from 'radix-vue'

defineOptions({
  inheritAttrs: false,
})

const emits = defineEmits<RadioGroupRootEmits>()

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  size: '2',
  variant: 'surface',
})
const forwarded = useForwardPropsEmits(props, emits)

const { size, variant, color, highContrast } = toRefs(props)

provideRadioGroupRootContext({ size, variant, color, highContrast })
</script>

<template>
  <RadioGroupRoot
    v-bind="{
      ...$attrs,
      ...forwarded,
      size: undefined,
      variant: undefined,
      color: undefined,
      highContrast: undefined,
    }"
  >
    <slot></slot>
  </RadioGroupRoot>
</template>
