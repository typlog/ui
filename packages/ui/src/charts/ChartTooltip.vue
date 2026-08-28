<script lang="ts">
import type { TooltipConfigInterface } from '@unovis/ts'

/** A Typlog-themed adapter for Unovis' interactive tooltip. */
export type ChartTooltipProps = TooltipConfigInterface
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { VisTooltip } from '@unovis/vue'
import { useForwardProps } from 'reka-ui'

const props = defineProps<ChartTooltipProps>()
const forwarded = useForwardProps(props)
const tooltipClass = computed(() => (
  ['ui-ChartTooltip', props.className].filter(Boolean).join(' ')
))
</script>

<template>
  <VisTooltip v-bind="forwarded" :class-name="tooltipClass" />
</template>
