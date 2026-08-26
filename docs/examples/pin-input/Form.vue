<script setup lang="ts">
import { ref } from 'vue'
import { Button, PinInputInput, PinInputRoot } from '#components'

const value = ref<string[]>([])
const submitted = ref('')

function submit(event: Event) {
  const form = event.currentTarget as HTMLFormElement
  submitted.value = new FormData(form).get('verificationCode')?.toString() ?? ''
}
</script>

<template>
  <form class="flex flex-col items-start gap-3" @submit.prevent="submit">
    <label for="verification-code">Verification code</label>
    <PinInputRoot
      id="verification-code"
      v-model="value"
      name="verificationCode"
      required
    >
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <Button type="submit">
      Submit
    </Button>
    <p v-if="submitted" class="text-sm text-gray-11">
      Submitted: {{ submitted }}
    </p>
  </form>
</template>
