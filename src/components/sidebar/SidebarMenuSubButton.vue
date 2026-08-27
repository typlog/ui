<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface SidebarMenuSubButtonProps extends PrimitiveProps {
  /** Marks this item as the current selection. */
  active?: boolean
  /** Prevents interaction with this item. */
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { injectSidebarMenuContext } from './SidebarMenu.vue'

const props = withDefaults(defineProps<SidebarMenuSubButtonProps>(), {
  as: 'button',
  active: false,
  disabled: false,
})

injectSidebarMenuContext()

function preventDisabled(event: MouseEvent) {
  if (!props.disabled)
    return
  event.preventDefault()
  event.stopImmediatePropagation()
}
</script>

<template>
  <Primitive
    class="ui-SidebarMenuSubButton"
    :as="props.as"
    :as-child="props.asChild"
    :type="props.as === 'button' && !props.asChild ? 'button' : undefined"
    :disabled="props.disabled && props.as === 'button' && !props.asChild ? true : undefined"
    :data-active="props.active ? true : undefined"
    :data-disabled="props.disabled ? true : undefined"
    :aria-disabled="props.disabled ? true : undefined"
    @click="preventDisabled"
  >
    <slot></slot>
  </Primitive>
</template>
