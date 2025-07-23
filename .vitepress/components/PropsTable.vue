<script lang="ts">
import type { PropData } from './_partials/VPropsTable.vue'

interface ComponentMeta {
  props: PropData[]
}

interface PropsTableProps {
  name: string
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
} from '#components'
import VPropsTable from './_partials/VPropsTable.vue'

const props = defineProps<PropsTableProps>()
const items = computed(() => {
  return modules[props.name].props
})

const selfProps = computed(() => {
  return items.value.filter(item => !item.inherit)
})

const inheritProps = computed(() => {
  return items.value.filter(item => Boolean(item.inherit))
})
</script>

<template>
  <div class="not-prose">
    <VPropsTable v-if="selfProps.length" :items="selfProps" />
    <CollapsibleRoot
      v-if="inheritProps.length"
      size="1"
      class="pt-4"
    >
      <CollapsibleTrigger class="font-medium">
        Props inherited from Reka UI
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
