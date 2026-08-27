<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface SidebarMenuButtonProps extends PrimitiveProps {
  /** Marks this item as the current selection. */
  active?: boolean
  /** Prevents interaction with this item. */
  disabled?: boolean
  /** Label shown when an icon-only collapsed item is hovered or focused. */
  tooltip?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import Tooltip from '../tooltip/Tooltip.vue'
import { injectSidebarMenuContext } from './SidebarMenu.vue'
import { injectSidebarRootContext } from './SidebarRoot.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: 'button',
  active: false,
  disabled: false,
})
const context = injectSidebarRootContext()
injectSidebarMenuContext()
const showTooltip = computed(() => Boolean(props.tooltip)
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
    :content="props.tooltip"
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
      <slot></slot>
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
    <slot></slot>
  </Primitive>
</template>
