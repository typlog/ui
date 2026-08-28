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
import { computed, useAttrs } from 'vue'
import { VisCrosshair } from '@unovis/vue'
import { useForwardPropsWithout } from '../components/util'
import { injectChartContext } from './context'
import ChartTooltipContent from './ChartTooltipContent.vue'
import { createChartTooltipTemplate } from './tooltip'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChartCrosshairProps<Datum>>(), {
  contentComponent: ChartTooltipContent,
  contentProps: () => ({}),
})
const context = injectChartContext()
const attrs = useAttrs()
const forwarded = useForwardPropsWithout(props, ['contentComponent', 'contentProps', 'template'])
const template = computed(() => createChartTooltipTemplate(
  context.config.value,
  props.contentComponent,
  props.contentProps,
))
const crosshairProps = computed(() => ({
  ...withoutTemplate(attrs),
  ...forwarded.value,
  template: template.value,
}))

function withoutTemplate (value: Record<string, unknown>) {
  const result = { ...value }
  delete result.template
  return result
}
</script>

<template>
  <VisCrosshair v-bind="crosshairProps" />
</template>
