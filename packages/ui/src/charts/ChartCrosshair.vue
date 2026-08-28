<script lang="ts">
import type { CrosshairConfigInterface } from '@unovis/ts'
import type { Component } from 'vue'

/** A Typlog-themed adapter for Unovis' crosshair and its tooltip template. */
export interface ChartCrosshairProps<Datum = unknown> extends /* @vue-ignore */ Omit<CrosshairConfigInterface<Datum>, 'template'> {
  /** Vue component rendered as the crosshair tooltip content. @default ChartTooltipContent */
  contentComponent?: Component
  /** Props passed to `contentComponent` in addition to payload, config, and x. */
  contentProps?: Record<string, unknown>
}
</script>

<script setup lang="ts" generic="Datum = unknown">
import { computed, onUnmounted, watch } from 'vue'
import { loadIcons } from '@iconify/vue'
import { VisCrosshair } from '@unovis/vue'
import { useForwardPropsWithout } from '../components/util'
import { injectChartContext } from './context'
import ChartTooltipContent from './ChartTooltipContent.vue'
import { createChartTooltipTemplate } from './tooltip'

const props = withDefaults(defineProps<ChartCrosshairProps<Datum>>(), {
  contentComponent: ChartTooltipContent,
  contentProps: () => ({}),
})

const context = injectChartContext()
const forwarded = useForwardPropsWithout(props, ['contentComponent', 'contentProps', 'template'])
const icons = computed(() => context.series.value.flatMap(entry => (
  entry.series.icon ? [entry.series.icon] : []
)))
let cancelIconLoad: (() => void) | undefined
watch(icons, value => {
  cancelIconLoad?.()
  cancelIconLoad = value.length ? loadIcons(value) : undefined
}, { immediate: true })
onUnmounted(() => cancelIconLoad?.())

const color = computed(() => {
  return context.series.value.map(d => `var(--chart-${d.index + 1})`)
})
const template = computed(() => createChartTooltipTemplate(
  context.config.value,
  props.contentComponent,
  props.contentProps,
))
</script>

<template>
  <VisCrosshair v-bind="{ ...forwarded, color, template }" />
</template>
