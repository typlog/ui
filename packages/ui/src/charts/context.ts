import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { ChartConfig, ChartSeries } from './types'

export interface ChartContext {
  config: Ref<ChartConfig>
  series: ComputedRef<Array<{ key: string; series: ChartSeries; index: number }>>
  colors: ComputedRef<string[]>
  mounted: Ref<boolean>
}

export const [injectChartContext, provideChartContext]
  = createContext<ChartContext>('ui:Chart')

export const defaultChartColors = [
  'var(--accent-9)',
  'var(--blue-9)',
  'var(--cyan-9)',
  'var(--green-9)',
  'var(--orange-9)',
  'var(--ruby-9)',
]
