<script lang="ts">
import type { PropData } from './_partials/VPropsTable.vue'

interface ComponentMeta {
  props: PropData[]
}

interface PropsTableProps {
  name: string
  expand?: boolean
}

const _regex = /\/(\w+)\.json$/
const _modules: Record<string, ComponentMeta> = import.meta.glob('../meta/*.json', { eager: true })
const modules: Record<string, ComponentMeta> = {}
Object.keys(_modules).forEach(name => {
  const m = name.match(_regex)
  modules[m![1]] = _modules[name]
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleIndicator,
} from '@typlog/ui'
import VPropsTable from './_partials/VPropsTable.vue'

const props = defineProps<PropsTableProps>()
const items = computed(() => {
  return modules[props.name].props
})

const selfProps = computed(() => {
  return items.value.filter(item => !item.inherit)
})

const inheritGroups = computed(() => {
  return items.value.reduce<Record<string, PropData[]>>((groups, item) => {
    if (item.inherit) {
      groups[item.inherit] ??= []
      groups[item.inherit].push(item)
    }
    return groups
  }, {})
})

const inheritLabels: Record<string, string> = {
  'reka-ui': 'Reka UI',
  'unovis': 'Unovis',
}
</script>

<template>
  <div class="not-prose">
    <VPropsTable
      v-if="selfProps.length"
      class="mb-4"
      :items="selfProps"
    />
    <CollapsibleRoot
      v-for="(inheritProps, source) in inheritGroups"
      :key="source"
      size="1"
      :default-open="props.expand"
    >
      <CollapsibleTrigger class="font-medium">
        Props inherited from {{ inheritLabels[source] ?? source }}
        <template #right>
          <CollapsibleIndicator />
        </template>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <VPropsTable :items="inheritProps" />
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
