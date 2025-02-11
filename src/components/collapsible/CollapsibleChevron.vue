<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CollapsibleTrigger } from 'reka-ui'
import IconButton from '../button/IconButton.vue'
import type { ButtonProps } from '../button/Button.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'ghost',
  color: 'gray',
})
</script>

<template>
  <IconButton class="ui-CollapsibleChevron" v-bind="props" :as="CollapsibleTrigger">
    <Icon icon="lucide:chevron-right" />
  </IconButton>
</template>

<style>
.ui-CollapsibleChevron {
  transition: transform 0.2s ease;
}
.ui-CollapsibleChevron:where([data-state="open"]) {
  transform: rotate(90deg);
}
</style>
