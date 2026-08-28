<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface SidebarMenuSubButtonProps extends PrimitiveProps {
  /** Iconify icon rendered before the text. */
  icon?: string
  /** Primary button text. */
  text?: string
  /** Iconify icon rendered in the trailing position. */
  trailingIcon?: string
  /** Marks this item as the current selection. */
  active?: boolean
  /** Prevents interaction with this item. */
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { injectSidebarMenuContext } from './SidebarMenu.vue'
import SidebarMenuButtonContent from './SidebarMenuButtonContent.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SidebarMenuSubButtonProps>(), {
  as: 'button',
  active: false,
  disabled: false,
})
defineSlots<{
  /** Shorthand for the `text` slot. */
  default?: () => any
  /** Replaces the leading `icon` prop. */
  icon?: () => any
  /** Replaces the `text` prop. */
  text?: () => any
  /** Replaces the `trailingIcon` prop. */
  trailing?: () => any
}>()

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
    v-bind="$attrs"
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
    <slot v-if="props.asChild"></slot>
    <SidebarMenuButtonContent
      v-else
      is-sub
      :icon="props.icon"
      :text="props.text"
      :trailing-icon="props.trailingIcon"
    >
      <template v-if="$slots.icon" #icon><slot name="icon"></slot></template>
      <template v-if="$slots.text" #text><slot name="text"></slot></template>
      <template v-if="$slots.default" #default><slot></slot></template>
      <template v-if="$slots.trailing" #trailing><slot name="trailing"></slot></template>
    </SidebarMenuButtonContent>
  </Primitive>
</template>
