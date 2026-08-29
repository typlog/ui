<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface SidebarTriggerProps extends PrimitiveProps {
  /** The sidebar edge controlled by this trigger. @default "left" */
  target?: 'left' | 'right'
  /** Overrides the generated accessible label. */
  label?: string
  /** Prevents the trigger from changing sidebar state. */
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { injectSidebarProviderContext } from './SidebarProvider.vue'

const props = withDefaults(defineProps<SidebarTriggerProps>(), {
  as: 'button',
  target: 'left',
  disabled: false,
})
const provider = injectSidebarProviderContext()
const target = computed(() => provider.sidebars[props.target])
const isDisabled = computed(() => props.disabled
  || !target.value
  || (!provider.isNarrowViewport.value && target.value.collapsible.value === 'none'))
const accessibleLabel = computed(() => {
  if (props.label)
    return props.label
  if (provider.isNarrowViewport.value)
    return `${target.value?.open.value ? 'Close' : 'Open'} ${props.target} sidebar`
  return `${target.value?.collapsed.value ? 'Expand' : 'Collapse'} ${props.target} sidebar`
})

function toggle(event: MouseEvent) {
  if (isDisabled.value || !target.value)
    return
  target.value.lastTrigger.value = event.currentTarget as HTMLElement
  target.value.toggle()
}
</script>

<template>
  <Primitive
    class="ui-SidebarTrigger"
    :as="props.as"
    :as-child="props.asChild"
    :type="props.as === 'button' ? 'button' : undefined"
    :disabled="isDisabled && props.as === 'button' ? true : undefined"
    :data-disabled="isDisabled ? true : undefined"
    :aria-disabled="isDisabled ? true : undefined"
    :data-collapsible="target?.collapsible.value"
    :data-target="props.target"
    :aria-label="accessibleLabel"
    :aria-controls="target?.panelId"
    :aria-expanded="provider.isNarrowViewport.value ? (target?.open.value ?? false) : !(target?.collapsed.value ?? true)"
    :aria-haspopup="provider.isNarrowViewport.value ? 'dialog' : undefined"
    @click="toggle"
  >
    <slot
      :open="target?.open.value ?? false"
      :collapsed="target?.collapsed.value ?? false"
      :target="props.target"
    >
      <Icon
        class="ui-SidebarTriggerIcon"
        :icon="props.target === 'right' ? 'lucide:panel-right' : 'lucide:panel-left'"
        aria-hidden="true"
      />
    </slot>
  </Primitive>
</template>
