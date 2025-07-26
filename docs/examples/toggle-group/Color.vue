<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ToggleGroupRoot, ToggleGroupItem } from '#components'

const selected = ref<string>('left')
</script>

<template>
  <div class="flex items-center gap-2">
    <ToggleGroupRoot v-model="selected" variant="surface" color="green">
      <ToggleGroupItem value="left">
        <Icon icon="lucide:align-left" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <Icon icon="lucide:align-center" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <Icon icon="lucide:align-right" />
      </ToggleGroupItem>
    </ToggleGroupRoot>

    <ToggleGroupRoot v-model="selected" variant="surface" color="red">
      <ToggleGroupItem value="left">
        <Icon icon="lucide:align-left" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <Icon icon="lucide:align-center" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <Icon icon="lucide:align-right" />
      </ToggleGroupItem>
    </ToggleGroupRoot>

    <ToggleGroupRoot v-model="selected" variant="surface" color="gray">
      <ToggleGroupItem value="left">
        <Icon icon="lucide:align-left" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <Icon icon="lucide:align-center" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right">
        <Icon icon="lucide:align-right" />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  </div>
</template>
