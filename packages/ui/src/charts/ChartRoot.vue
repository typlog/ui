<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ChartConfig } from './types'

export interface ChartRootProps extends PrimitiveProps {
  /** Series metadata used by ChartLegend and ChartTooltip. */
  config: ChartConfig
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, toRef, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { useForwardPropsWithout } from '../components/util'
import { defaultChartColors, provideChartContext } from './context'
import { getChartColors, getChartEntries } from './util'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChartRootProps>(), {
  as: 'div',
})

const forwarded = useForwardPropsWithout(props, [
  'config',
])
const attrs = useAttrs()
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
const rootAttrs = computed(() => ({
  ...attrs,
  ...forwarded.value,
  style: [attrs.style, chartStyle.value],
}))

provideChartContext({ config, series, colors, mounted })
</script>

<template>
  <Primitive v-bind="rootAttrs" class="ui-ChartRoot">
    <slot :mounted="mounted"></slot>
  </Primitive>
</template>
