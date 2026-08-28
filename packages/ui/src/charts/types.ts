import type { Component } from 'vue'

/** Determines whether a configured field is the x-axis domain or a data series. */
export type ChartSeriesRole = 'x' | 'series'

/** A chart field and its presentation metadata. */
export interface ChartSeries {
  /** Human-readable series name. */
  label: string
  /** Identifies an x-axis/domain field. Entries default to `series`. */
  role?: ChartSeriesRole
  /** Optional CSS color. Defaults to the chart palette. */
  color?: string
  /** Optional icon rendered before the series label. */
  icon?: Component
}

/** Configuration keyed by the series identifier used by a chart primitive. */
export type ChartConfig = Record<string, ChartSeries>

export interface ChartLegendItemSlotProps {
  key: string
  series: ChartSeries
  index: number
}
