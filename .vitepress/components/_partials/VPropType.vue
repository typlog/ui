<script setup lang="ts">
import { computed } from 'vue'
import {
  Badge,
  IconButton,
  PopoverRoot,
  PopoverTrigger,
  PopoverPopup,
} from '#components'
import QuestionIcon from '~icons/ri/question-line'

const props = defineProps<{name: string, type: string}>()

const values = computed(() => {
  return props.type.split(/\s*\|\s*/)
})
</script>

<template>
  <div v-if="type.length < 48" class="h-6 flex gap-2">
    <Badge
      v-for="value in values"
      :key="value"
      variant="outline"
      color="gray"
    >
      {{ value }}
    </Badge>
  </div>
  <div v-else class="flex items-center gap-1">
    <a
      v-if="name === 'color'"
      class="text-sm underline hover:text-indigo-11"
      href="/overview/color/"
    >
      <span class="font-medium">Color</span>
    </a>
    <span v-else class="text-sm font-medium">Enum</span>
    <PopoverRoot>
      <PopoverTrigger as-child>
        <IconButton size="1" variant="ghost" color="gray">
          <QuestionIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverPopup>
        <div class="text-sm max-w-96 p-4 flex flex-wrap gap-2">
          <Badge
            v-for="value in values"
            :key="value"
            variant="outline"
            color="gray"
          >
            {{ value }}
          </Badge>
        </div>
      </PopoverPopup>
    </PopoverRoot>
  </div>
</template>
