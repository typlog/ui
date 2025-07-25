<script lang="ts">
import type { ColorType } from '#components'

const STATUS_COLOR_MAP: Record<string, ColorType> = {
  alpha: 'orange',
  beta: 'bronze',
  stable: 'green',
}
</script>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { Icon, Badge } from '#components'

const { frontmatter } = useData()

const statusColor = computed(() => STATUS_COLOR_MAP[frontmatter.value.status])
</script>
<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center mt-5 mb-12 font-medium">
    <div v-if="frontmatter.status">
      <Badge
        class="capitalize"
        :color="statusColor"
      >
        {{ frontmatter.status }}
      </Badge>
    </div>
    <div v-if="frontmatter.source">
      <a
        class="flex items-center gap-1 text-gray-11 hover:text-gray-12"
        :href="frontmatter.source"
      >
        <Icon class="text-gray-12 text-sm" icon="simple-icons:github" />
        <span class="text-sm">View source</span>
      </a>
    </div>
    <div v-if="frontmatter.radix">
      <a
        class="flex items-center gap-1 text-gray-11 hover:text-gray-12"
        :href="frontmatter.radix"
      >
        <Icon class="text-gray-12 text-sm" icon="simple-icons:radixui" />
        <span class="text-sm">Radix Themes</span>
      </a>
    </div>
    <div v-if="frontmatter.reka">
      <a
        class="flex items-center gap-1 text-gray-11 hover:text-gray-12"
        :href="frontmatter.reka"
      >
        <i class="reka-icon"></i>
        <span class="text-sm">Reka UI</span>
      </a>
    </div>
  </div>
</template>
