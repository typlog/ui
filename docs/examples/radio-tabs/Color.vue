<script setup lang="ts">
import { ref } from 'vue'
import { RadioTabsRoot, RadioTabsItem } from '#components'

const selected = ref<string>('1')
</script>

<template>
  <div class="flex flex-col gap-4">
    <RadioTabsRoot v-model="selected" color="gray">
      <RadioTabsItem value="1">
        Default
      </RadioTabsItem>
      <RadioTabsItem value="2">
        Simple
      </RadioTabsItem>
      <RadioTabsItem value="3">
        Compact
      </RadioTabsItem>
    </RadioTabsRoot>

    <RadioTabsRoot v-model="selected" color="green">
      <RadioTabsItem value="1">
        Default
      </RadioTabsItem>
      <RadioTabsItem value="2">
        Simple
      </RadioTabsItem>
      <RadioTabsItem value="3">
        Compact
      </RadioTabsItem>
    </RadioTabsRoot>

    <RadioTabsRoot v-model="selected" color="crimson">
      <RadioTabsItem value="1">
        Default
      </RadioTabsItem>
      <RadioTabsItem value="2">
        Simple
      </RadioTabsItem>
      <RadioTabsItem value="3">
        Compact
      </RadioTabsItem>
    </RadioTabsRoot>
  </div>
</template>
