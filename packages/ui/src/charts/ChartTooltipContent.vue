<script lang="ts">
import type { ChartConfig } from './types'

export type ChartTooltipIndicator = 'dot' | 'line' | 'dashed' | 'none'

export interface ChartTooltipContentProps {
  /** Values keyed by the matching ChartConfig series key. */
  payload?: Record<string, unknown>
  /** Series metadata. Passed automatically by createChartTooltipTemplate. */
  config?: ChartConfig
  /** Domain value displayed as the tooltip label. */
  x?: string | number | Date
  /** Indicator displayed beside each series. @default "dot" */
  indicator?: ChartTooltipIndicator
  /** Hides the tooltip label. */
  hideLabel?: boolean
  /** Hides series indicators without removing icons. */
  hideIndicator?: boolean
  /** Uses a payload or config key instead of the role-x value or crosshair x. */
  labelKey?: string
  /** Formats the final tooltip label. Priority: hideLabel, labelKey, role-x field, crosshair x. */
  labelFormatter?: (value: string | number | Date) => string
  /** Formats a series value. */
  valueFormatter?: (value: unknown, key: string) => string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { buildIcon, getIcon } from '@iconify/vue'

const props = withDefaults(defineProps<ChartTooltipContentProps>(), {
  payload: () => ({}),
  config: () => ({}),
  indicator: 'dot',
})

const items = computed(() => Object.entries(props.payload)
  .map(([key, value]) => ({ key, value, series: props.config[key] }))
  .filter(item => Boolean(item.series) && item.series!.role !== 'x')
  .map((item, index) => ({
    ...item,
    index,
    icon: buildSeriesIcon(item.series!.icon),
  })))

function buildSeriesIcon (name?: string) {
  const icon = name ? getIcon(name) : undefined
  return icon ? buildIcon(icon) : undefined
}

const label = computed(() => {
  if (props.hideLabel)
    return undefined

  const xKey = Object.entries(props.config).find(([_key, series]) => series.role === 'x')?.[0]
  const value = props.labelKey
    ? (props.config[props.labelKey]?.label ?? props.payload[props.labelKey] ?? props.x)
    : (xKey ? props.payload[xKey] ?? props.x : props.x)

  if (value === undefined || value === null)
    return undefined
  const labelValue = typeof value === 'string' || typeof value === 'number' || value instanceof Date
    ? value
    : String(value)
  return props.labelFormatter ? props.labelFormatter(labelValue) : String(labelValue)
})

function formatValue (value: unknown, key: string) {
  if (props.valueFormatter)
    return props.valueFormatter(value, key)
  if (typeof value === 'number')
    return value.toLocaleString()
  return String(value ?? '—')
}
</script>

<template>
  <div class="ui-ChartTooltipContent">
    <slot :items="items" :label="label">
      <div v-if="label" class="ui-ChartTooltipLabel">
        {{ label }}
      </div>
      <div class="ui-ChartTooltipItems">
        <div v-for="item in items" :key="item.key" class="ui-ChartTooltipItem">
          <svg
            v-if="item.icon"
            v-bind="item.icon.attributes"
            class="ui-ChartTooltipIcon"
            aria-hidden="true"
            focusable="false"
            v-html="item.icon.body"
          ></svg>
          <span
            v-else-if="!props.hideIndicator && props.indicator !== 'none'"
            class="ui-ChartTooltipIndicator"
            :class="`r-indicator-${props.indicator}`"
            :style="{ '--chart-tooltip-color': item.series!.color ?? `var(--chart-${item.index + 1})` }"
          ></span>
          <span class="ui-ChartTooltipSeries">
            <span class="ui-ChartTooltipSeriesLabel">{{ item.series!.label }}</span>
          </span>
          <span class="ui-ChartTooltipValue">{{ formatValue(item.value, item.key) }}</span>
        </div>
      </div>
    </slot>
  </div>
</template>
