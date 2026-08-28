<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface SidebarMenuButtonProps extends PrimitiveProps {
  /** Iconify icon rendered before the text. */
  icon?: string
  /** Primary button text. Also supplies the collapsed tooltip by default. */
  text?: string
  /** Iconify icon rendered in the trailing position. */
  trailingIcon?: string
  /** Marks this item as the current selection. */
  active?: boolean
  /** Prevents interaction with this item. */
  disabled?: boolean
  /**
   * Label shown when an icon-only collapsed item is hovered or focused.
   * Set to `false` to disable the tooltip inferred from `text`.
   */
  tooltip?: string | false
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import Tooltip from '../tooltip/Tooltip.vue'
import { injectSidebarMenuContext } from './SidebarMenu.vue'
import { injectSidebarContext } from './Sidebar.vue'
import SidebarMenuButtonContent from './SidebarMenuButtonContent.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
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
const context = injectSidebarContext()
injectSidebarMenuContext()
const tooltip = computed(() => props.tooltip === false ? undefined : props.tooltip ?? props.text)
const showTooltip = computed(() => Boolean(tooltip.value)
  && !props.disabled
  && !context.isMobile.value
  && context.collapsible.value === 'icon'
  && context.collapsed.value)
const tooltipSide = computed(() => context.side.value === 'left' ? 'right' : 'left')

function preventDisabled(event: MouseEvent) {
  if (!props.disabled)
    return
  event.preventDefault()
  event.stopImmediatePropagation()
}
</script>

<template>
  <Tooltip
    v-if="showTooltip"
    as-child
    :content="tooltip"
    :side="tooltipSide"
    :side-offset="8"
  >
    <Primitive
      v-bind="$attrs"
      class="ui-SidebarMenuButton"
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
  </Tooltip>
  <Primitive
    v-else
    v-bind="$attrs"
    class="ui-SidebarMenuButton"
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
