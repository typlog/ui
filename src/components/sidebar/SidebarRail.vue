<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface SidebarRailProps extends PrimitiveProps {
  /** Overrides the generated accessible label. */
  label?: string
  /** Prevents the rail from changing the collapsed state. */
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { injectSidebarRootContext } from './SidebarRoot.vue'

const props = withDefaults(defineProps<SidebarRailProps>(), { as: 'button', disabled: false })
const context = injectSidebarRootContext()
const isDisabled = computed(() => props.disabled || context.collapsible.value === 'none')
const accessibleLabel = computed(() => props.label
  ?? `${context.collapsed.value ? 'Expand' : 'Collapse'} ${context.side.value} sidebar`)
</script>

<template>
  <Primitive
    class="ui-SidebarRail"
    :as="props.as"
    :as-child="props.asChild"
    :type="props.as === 'button' ? 'button' : undefined"
    :disabled="isDisabled && props.as === 'button' ? true : undefined"
    :data-disabled="isDisabled ? true : undefined"
    :aria-disabled="isDisabled ? true : undefined"
    :aria-label="accessibleLabel"
    :aria-controls="context.contentId"
    :aria-expanded="!context.collapsed.value"
    @click="!isDisabled && context.toggleCollapsed()"
  >
    <slot :collapsed="context.collapsed.value"></slot>
  </Primitive>
</template>
