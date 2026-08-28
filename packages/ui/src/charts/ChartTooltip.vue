<script lang="ts">
import { Donut, GroupedBar, StackedBar } from '@unovis/ts'
import type { TooltipConfigInterface } from '@unovis/ts'
import type { Component } from 'vue'

export type ChartTooltipPrimitive = typeof Donut | typeof GroupedBar | typeof StackedBar

/** A supported Unovis primitive that can provide automatic tooltip triggers. */
export interface ChartTooltipTargetDescriptor {
  primitive: ChartTooltipPrimitive
  /** Maps the primitive's event datum to values keyed by ChartConfig. */
  payload?: (data: any, index: number) => Record<string, unknown>
}

export type ChartTooltipTarget = ChartTooltipPrimitive | ChartTooltipTargetDescriptor

/** A Typlog-themed adapter for Unovis' interactive tooltip. */
export interface ChartTooltipProps extends /* @vue-ignore */ TooltipConfigInterface {
  /** Unovis primitives that should automatically trigger the themed tooltip. */
  targets?: ChartTooltipTarget[]
  /** Vue component rendered as the tooltip content. @default ChartTooltipContent */
  contentComponent?: Component
  /** Props passed to `contentComponent` in addition to payload, config, and x. */
  contentProps?: Record<string, unknown>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { VisTooltip } from '@unovis/vue'
import { useForwardPropsWithout } from '../components/util'
import { injectChartContext } from './context'
import ChartTooltipContent from './ChartTooltipContent.vue'
import { createChartTooltipTemplate } from './tooltip'

const props = withDefaults(defineProps<ChartTooltipProps>(), {
  contentComponent: ChartTooltipContent,
  contentProps: () => ({}),
})

const context = injectChartContext()
const forwarded = useForwardPropsWithout(props, ['targets', 'contentComponent', 'contentProps', 'triggers'])
const tooltipClass = computed(() => (
  ['ui-ChartTooltip', props.className].filter(Boolean).join(' ')
))

const template = computed(() => createChartTooltipTemplate(
  context.config.value,
  props.contentComponent,
  props.contentProps,
))

const generatedTriggers = computed(() => {
  const triggers: NonNullable<TooltipConfigInterface['triggers']> = {}

  for (const target of props.targets ?? []) {
    const descriptor = typeof target === 'function'
      ? { primitive: target }
      : target
    const { primitive, payload } = descriptor

    if (primitive === Donut) {
      triggers[Donut.selectors.segment] = (arc: unknown, index: number) => {
        const mapped = payload ? payload(arc, index) : donutPayload(arc, index)
        return template.value(mapped)
      }
    }

    if (primitive === GroupedBar) {
      triggers[GroupedBar.selectors.bar] = (datum: unknown, index: number) => {
        const mapped = payload ? payload(datum, index) : datum
        return template.value(mapped)
      }
    }

    if (primitive === StackedBar) {
      triggers[StackedBar.selectors.bar] = (datum: unknown, index: number) => {
        const mapped = payload ? payload(datum, index) : unwrapStackedDatum(datum)
        return template.value(mapped)
      }
    }
  }

  return triggers
})

const triggers = computed(() => ({
  ...generatedTriggers.value,
  ...props.triggers,
}))

function donutPayload (value: unknown, callbackIndex: number) {
  if (!isRecord(value))
    return {}

  const arcIndex = typeof value.index === 'number' ? value.index : callbackIndex
  const entry = context.series.value[arcIndex]
  if (!entry)
    return {}

  return { [entry.key]: value.value }
}

function unwrapStackedDatum (value: unknown) {
  if (!isRecord(value) || !isRecord(value.datum))
    return value
  return { ...value, ...value.datum }
}

function isRecord (value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}
</script>

<template>
  <VisTooltip v-bind="{ ...forwarded, triggers }" :class-name="tooltipClass" />
</template>
