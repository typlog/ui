<script setup lang="ts">
import { ref } from 'vue'
import { PinInputInput, PinInputRoot } from '#components'

const value = ref<number[]>([])
const completed = ref('')

function onComplete(code: number[]) {
  completed.value = code.join('')
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <PinInputRoot
      v-model="value"
      type="number"
      otp
      placeholder="·"
      @complete="onComplete"
    >
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <p class="text-sm text-gray-11">
      {{ completed ? `Completed: ${completed}` : 'Enter the six-digit code.' }}
    </p>
  </div>
</template>
