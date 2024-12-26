<script lang="ts">
import type { SelectRootProps as _SelectRootProps, SelectRootEmits } from 'reka-ui'

export interface SelectRootProps extends _SelectRootProps {
  size?: '1' | '2' | '3'
}
</script>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { SelectRoot, useForwardExpose } from 'reka-ui'
import { useForwardPropsEmits } from './util'

const props = withDefaults(defineProps<SelectRootProps>(), {
  size: '2',
})
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits, ['size'])
provide('SelectRoot.size', computed(() => props.size))

useForwardExpose()
</script>

<template>
  <SelectRoot
    v-bind="forwarded"
    class="ui-SelectItem"
  >
    <slot></slot>
  </SelectRoot>
</template>
