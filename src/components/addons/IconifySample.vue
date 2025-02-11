<script lang="ts">
export interface CollectionItem {
  prefix: string
  category: string
  name: string
  samples: string[]
  total: number
  license: {
    title: string
  },
  [x: string]: unknown
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = defineProps<CollectionItem>()
</script>

<template>
  <button type="button" class="ui-IconifySample">
    <div class="ui-IconifySampleInfo">
      <strong>{{ props.name }}</strong>
      <span>{{ props.license.title }}</span>
      <span>{{ props.total }} icons</span>
    </div>
    <div class="ui-IconifySampleIcons">
      <span
        v-for="icon in props.samples"
        :key="icon"
      >
        <Icon :icon="props.prefix + ':' + icon" />
      </span>
    </div>
  </button>
</template>

<style>
.ui-IconifySample {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-2);
  justify-content: space-between;
  align-items: center;
  text-align: left;
  border-radius: var(--radius-3);
  background: var(--gray-a2);
}
.ui-IconifySample:hover {
  background: var(--gray-a3);
}
.ui-IconifySampleInfo {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.ui-IconifySampleInfo > strong {
  font-weight: 500;
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
}
.ui-IconifySampleInfo > span {
  font-weight: 400;
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  color: var(--gray-a10);
}
.ui-IconifySampleIcons {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-2);
}
</style>
