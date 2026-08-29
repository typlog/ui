<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  FormRoot,
  TextField,
} from '@typlog/ui'

const email = ref('')
const submitted = ref(false)
</script>

<template>
  <FormRoot class="flex max-w-sm flex-col gap-4" @submit="submitted = true">
    <FieldRoot name="email" required>
      <FieldLabel>Email</FieldLabel>
      <FieldControl as-child>
        <TextField v-model="email" type="email" required placeholder="you@example.com" />
      </FieldControl>
      <FieldDescription>Used for sign-in and account recovery.</FieldDescription>
      <FieldError />
    </FieldRoot>
    <Button type="submit">Continue</Button>
    <p v-if="submitted" class="text-sm text-gray-11">Submitted: {{ email }}</p>
  </FormRoot>
</template>
