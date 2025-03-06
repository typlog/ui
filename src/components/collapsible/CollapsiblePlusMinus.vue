<script setup lang="ts">
import { CollapsibleTrigger } from 'reka-ui'
import ExpandCollapseIcon from '../icon/ExpandCollapseIcon.vue'
import type { ExpandCollapseIconProps } from '../icon/ExpandCollapseIcon.vue'

const props = withDefaults(defineProps<ExpandCollapseIconProps>(), {
  color: undefined,
  size: '1',
})
</script>

<template>
  <CollapsibleTrigger as-child>
    <ExpandCollapseIcon v-bind="props" />
  </CollapsibleTrigger>
</template>
