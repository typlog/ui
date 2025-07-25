<script setup lang="ts">
import { ref } from 'vue'
import { RadioTabsRoot, RadioTabsItem } from '#components'

const selected = ref<string>('1')
</script>

<template>
  <div class="flex items-center">
    <RadioTabsRoot v-model="selected">
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
