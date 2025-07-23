<script setup lang="ts">
import { ref } from 'vue'
import { Icon, ToggleGroupRoot, ToggleGroupItem } from '#components'

const selected = ref<string>('left')
</script>

<template>
  <div class="flex items-center gap-2">
    <ToggleGroupRoot size="1" v-model="selected">
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
    <ToggleGroupRoot size="2" v-model="selected">
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
    <ToggleGroupRoot size="3" v-model="selected">
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
