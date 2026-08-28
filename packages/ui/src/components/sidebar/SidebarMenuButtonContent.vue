<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

interface SidebarMenuButtonContentProps {
  icon?: string
  text?: string
  trailingIcon?: string
  isSub?: boolean
}

const props = withDefaults(defineProps<SidebarMenuButtonContentProps>(), {
  isSub: false,
})
defineSlots<{
  default?: () => any
  icon?: () => any
  text?: () => any
  trailing?: () => any
}>()

const part = computed(() => props.isSub ? 'ui-SidebarMenuSubButton' : 'ui-SidebarMenuButton')
</script>

<template>
  <span
    v-if="$slots.icon || props.icon"
    :class="`${part}Icon`"
  >
    <slot name="icon">
      <Icon
        :class="`${part}IconGraphic`"
        :icon="props.icon!"
        aria-hidden="true"
      />
    </slot>
  </span>
  <span
    v-if="$slots.text || $slots.default || props.text"
    :class="`${part}Text`"
  >
    <slot name="text">
      <slot>{{ props.text }}</slot>
    </slot>
  </span>
  <span
    v-if="$slots.trailing || props.trailingIcon"
    :class="`${part}Trailing`"
  >
    <slot name="trailing">
      <Icon
        :class="`${part}TrailingIcon`"
        :icon="props.trailingIcon!"
        aria-hidden="true"
      />
    </slot>
  </span>
</template>
