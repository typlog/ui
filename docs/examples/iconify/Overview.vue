<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  PopoverRoot,
  PopoverTrigger,
  PopoverPopup,
} from '@typlog/ui'
import { IconCollection } from '@typlog/ui/addons'

const selectedIcon = ref('')
const collection = ref('')
const query = ref('')

const onSelectIcon = (icon: string) => {
  console.info('select:', icon)
}
</script>

<template>
  <PopoverRoot>
    <Button :as="PopoverTrigger">Choose an icon</Button>
    <PopoverPopup class="w-96 p-0">
      <IconCollection
        v-model="selectedIcon"
        v-model:collection="collection"
        v-model:query="query"
        :ui="{
          browser: 'p-4',
          grid: {
            header: 'p-4',
            viewport: 'px-4',
          },
        }"
        @select="onSelectIcon"
      />
    </PopoverPopup>
  </PopoverRoot>
</template>
