<script lang="ts">
interface PropData {
  name: string
  description: string
  type: string
  required: boolean
  default?: string
}

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
  Table,
  Badge,
  Icon,
  IconButton,
  PopoverRoot,
  PopoverTrigger,
  PopoverPopup,
} from '#components'

const props = defineProps<PropsTableProps>()
const items = computed(() => {
  return modules[props.name].props
})
</script>

<template>
  <div class="not-prose">
    <Table class="vp-PropsTable" variant="surface">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Default</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>
            <Badge class="font-mono" variant="surface">{{ item.name }}</Badge>
          </td>
          <td>
            <Badge
              v-if="item.default"
              class="font-mono"
              color="gray"
              variant="surface"
            >
              {{ item.default }}
            </Badge>
            <div v-else class="text-center">
              <span class="text-sm text-gray-10">–</span>
            </div>
          </td>
          <td>
            <div class="flex flex-col">
              <div v-if="item.type.length < 48" class="h-6">
                <Badge variant="outline" color="gray">{{ item.type }}</Badge>
              </div>
              <div v-else class="flex items-center gap-1">
                <span class="text-sm font-medium">Enum</span>
                <PopoverRoot>
                  <PopoverTrigger as-child>
                    <IconButton size="1" variant="ghost" color="gray">
                      <Icon icon="lucide:circle-question-mark" />
                    </IconButton>
                  </PopoverTrigger>
                  <PopoverPopup :side-offset="4">
                    <div class="text-sm max-w-96">
                      <code>{{ item.type }}</code>
                    </div>
                  </PopoverPopup>
                </PopoverRoot>
              </div>
              <div
                v-if="item.description"
                class="text-sm text-muted-foreground"
                v-html="item.description"
              >
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
</template>
