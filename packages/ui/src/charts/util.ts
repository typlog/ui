import type { ChartConfig } from './types'
import { defaultChartColors } from './context'

export function getChartEntries (config: ChartConfig) {
  return Object.entries(config)
    .filter(entry => entry[1].role !== 'x')
    .map(([key, series], index) => ({ key, series, index }))
}

export function getChartColors (config: ChartConfig) {
  return getChartEntries(config).map(({ series, index }) => (
    series.color ?? defaultChartColors[index % defaultChartColors.length]
  ))
}
