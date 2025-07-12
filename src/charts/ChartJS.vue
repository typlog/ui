<script lang="ts">
import type { ChartType, ChartDataset } from 'chart.js/auto'

export interface ChartJsProps {
  type: ChartType
  labels: string[]
  datasets: ChartDataset[]
  height?: string | number
}
</script>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import {
  ref,
  nextTick,
  markRaw,
  useTemplateRef,
  onMounted,
  onBeforeUnmount,
} from 'vue'

const props = withDefaults(defineProps<ChartJsProps>(), {
  width: '100%',
  height: 240,
})

let chart: Chart | null
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

const ready = ref(false)

const updateChart = () => {
  if (chart) {
    chart.data = {
      labels: props.labels,
      datasets: props.datasets,
    }
    chart.update()
  }
}

onMounted(() => {
  nextTick(() => {
    chart = new Chart(canvasRef.value!, {
      type: props.type,
      data: {
        labels: props.labels,
        datasets: props.datasets,
      },
    })
    markRaw(chart)
    ready.value = true
  })
})

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
    chart = null
  }
})

defineExpose({ update: updateChart })
</script>

<template>
  <div class="ui-Chart">
    <div v-if="ready && $slots.head" class="ui-ChartHead">
      <slot name="head" :chart="chart" :datasets="datasets"></slot>
    </div>
    <div class="ui-ChartContent" :style="{'height': '230px'}">
      <canvas ref="canvasRef"></canvas>
    </div>
    <div v-if="ready && $slots.foot" class="ui-ChartFoot">
      <slot name="foot" :chart="chart" :datasets="datasets"></slot>
    </div>
  </div>
</template>

<style>
</style>
