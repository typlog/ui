<script setup lang="ts">
import { computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import type { ColorType } from './types'

export interface QuotaProps {
  percent: number
  color?: ColorType
}

const props = defineProps<QuotaProps>()
const style = computed(() => {
  const transform = `translateX(-${100 - props.percent}%)`
  if (props.percent > 100) {
    return { transform, 'background-color': 'var(--red-a10)' }
  }
  let alpha = 'a4'
  if (props.percent > 90) {
    alpha = 'a11'
  } else if (props.percent > 66) {
    alpha = 'a9'
  } else if (props.percent > 33) {
    alpha = 'a6'
  }
  return { transform, 'background-color': `var(--blue-${alpha})` }
})
const percent = computed(() => {
  if (props.percent > 100) {
    return 100
  } else if (props.percent < 0) {
    return 0
  }
  return props.percent
})
</script>

<template>
  <ProgressRoot
    class="ui-Quota"
    :model-value="percent"
    :data-accent-color="props.color"
  >
    <ProgressIndicator
      class="ui-QuotaValue"
      :style="style"
    />
  </ProgressRoot>
</template>

<style>
.ui-Quota {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-full);
  width: 100%;
  height: var(--space-2);
  background-color: var(--slate-4);
}
.ui-QuotaValue {
  border-radius: var(--radius-full);
  width: 100%;
  height: 100%;
}
</style>
