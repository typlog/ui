<script setup lang="ts">
import { ref } from 'vue'
import { PinInputInput, PinInputRoot } from '@typlog/ui'

const value = ref<string[]>([])
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <PinInputRoot v-model="value">
      <PinInputInput
        v-for="index in 6"
        :key="index"
        :index="index - 1"
      />
    </PinInputRoot>
    <p class="text-sm text-gray-11">
      Value: {{ value.join('') || '—' }}
    </p>
  </div>
</template>
