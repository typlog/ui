<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import {
  Button,
  FieldControl,
  FieldError,
  FieldLabel,
  FieldRoot,
  FormRoot,
  TextField,
} from '@typlog/ui'

const schema = z.object({
  email: z.string().email('Enter a valid email.').transform(value => value.toLowerCase()),
})
const email = ref('')
const errors = ref<Record<string, string>>({})
const parsedEmail = ref('')

const submit = async () => {
  const result = await schema.safeParseAsync({ email: email.value })
  if (!result.success) {
    errors.value = Object.fromEntries(result.error.issues.map(issue => [issue.path.join('.'), issue.message]))
    parsedEmail.value = ''
    return
  }
  errors.value = {}
  parsedEmail.value = result.data.email
}
</script>

<template>
  <FormRoot class="flex max-w-sm flex-col gap-4" :errors="errors" @submit="submit">
    <FieldRoot name="email">
      <FieldLabel>Email</FieldLabel>
      <FieldControl as-child>
        <TextField v-model="email" placeholder="you@example.com" />
      </FieldControl>
      <FieldError />
    </FieldRoot>
    <Button type="submit">Validate</Button>
    <p v-if="parsedEmail" class="text-sm text-green-11">Parsed output: {{ parsedEmail }}</p>
  </FormRoot>
</template>
