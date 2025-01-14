<script lang="ts">
import type{ ComboboxInputProps as _ComboboxInputProps, ComboboxInputEmits } from 'reka-ui'
import type { RadiusType } from './types'

export interface ComboboxInputProps extends _ComboboxInputProps {
  variant?: 'surface' | 'soft'
  radius?: RadiusType
  placeholder?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxTrigger,
  useForwardPropsEmits,
} from 'reka-ui'
import { Icon } from '@iconify/vue'
import { injectComboboxRootContext } from './ComboboxRoot.vue'

defineOptions({
  inheritAttrs: false,
})

const context = injectComboboxRootContext()

const props = withDefaults(defineProps<ComboboxInputProps>(), {
  variant: 'surface',
})

const emits = defineEmits<ComboboxInputEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const anchorClass = computed(() => {
  const rv = ['r-size-' + context.size.value, 'r-variant-' + props.variant]
  if (context.highContrast) {
    rv.push('r-high-contrast')
  }
  return rv
})
</script>

<template>
  <ComboboxAnchor
    class="ui-ComboboxInput ui-TextField"
    :class="anchorClass"
    :data-accent-color="context.color.value"
  >
    <ComboboxInput
      class="ui-TextFieldInput"
      v-bind="{
        ...$attrs,
        ...forwarded,
        variant: undefined,
        radius: undefined,
      }"
      :data-radius="radius"
    />
    <ComboboxTrigger
      class="ui-TextFieldSlot"
      data-side="right"
    >
      <Icon icon="radix-icons:chevron-down" />
    </ComboboxTrigger>
  </ComboboxAnchor>
</template>
