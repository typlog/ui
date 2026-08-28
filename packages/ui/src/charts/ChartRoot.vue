<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ChartConfig } from './types'
import type { ColorType } from '../components/types'

export interface ChartRootProps extends PrimitiveProps {
  /** Series metadata used by ChartLegend and ChartTooltip. */
  config: ChartConfig,
  colors?: ColorType[],
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, toRef } from 'vue'
import { Primitive } from 'reka-ui'
import { useForwardPropsWithout } from '../components/util'
import { defaultChartColors, provideChartContext } from './context'
import { getChartColors, getChartEntries } from './util'

const props = withDefaults(defineProps<ChartRootProps>(), {
  as: 'div',
})

const forwarded = useForwardPropsWithout(props, ['config'])

const config = toRef(props, 'config')
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
const series = computed(() => getChartEntries(config.value))
const colors = computed(() => getChartColors(config.value))
const chartStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {}
  defaultChartColors.forEach((color, index) => {
    style[`--chart-${index + 1}`] = color
  })
  colors.value.forEach((color, index) => {
    style[`--chart-${index + 1}`] = color
    style[`--vis-color${index}`] = color
  })
  return style
})

provideChartContext({ config, series, colors, mounted })
</script>

<template>
  <Primitive v-bind="forwarded" class="ui-ChartRoot" :style="chartStyle">
    <slot :mounted="mounted"></slot>
  </Primitive>
</template>
