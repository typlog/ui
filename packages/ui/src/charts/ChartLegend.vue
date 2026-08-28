<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ChartLegendItemSlotProps } from './types'

export interface ChartLegendProps extends PrimitiveProps {
  /** Layout direction for legend entries. @default "horizontal" */
  orientation?: 'horizontal' | 'vertical'
  /** Alignment of legend entries within the legend. @default "start" */
  align?: 'start' | 'center' | 'end'
  /** Accessible name for the legend list. @default "Chart legend" */
  ariaLabel?: string
}

export type { ChartLegendItemSlotProps }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { buildPropsClass, useForwardPropsWithout } from '../components/util'
import { injectChartContext } from './context'

const props = withDefaults(defineProps<ChartLegendProps>(), {
  as: 'div',
  orientation: 'horizontal',
  align: 'start',
  ariaLabel: 'Chart legend',
})

const forwarded = useForwardPropsWithout(props, ['orientation', 'align', 'ariaLabel'])
const resetClass = buildPropsClass(props, ['orientation', 'align'])
const context = injectChartContext()
const entries = computed(() => context.series.value)
</script>

<template>
  <Primitive
    v-bind="forwarded"
    class="ui-ChartLegend"
    :class="resetClass"
    role="list"
    :aria-label="props.ariaLabel"
  >
    <div
      v-for="entry in entries"
      :key="entry.key"
      class="ui-ChartLegendItem"
      role="listitem"
    >
      <slot name="item" v-bind="entry">
        <slot name="marker" v-bind="entry">
          <span class="ui-ChartLegendMarker" :style="{ backgroundColor: context.colors.value[entry.index] }"></span>
        </slot>
        <component :is="entry.series.icon" v-if="entry.series.icon" class="ui-ChartLegendIcon" aria-hidden="true" />
        <span class="ui-ChartLegendLabel">{{ entry.series.label }}</span>
      </slot>
    </div>
  </Primitive>
</template>
