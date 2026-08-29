<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  FieldControl,
  FieldError,
  FieldLabel,
  FieldRoot,
  FormRoot,
  TextField,
} from '@typlog/ui'

const username = ref('')
const errors = ref<Record<string, string>>({})
const formError = ref('')

const submit = () => {
  errors.value = username.value === 'taken' ? { username: 'That username is already taken.' } : {}
  formError.value = username.value === 'offline' ? 'The service is unavailable. Try again.' : ''
}
</script>

<template>
  <FormRoot
    class="flex max-w-sm flex-col gap-4"
    :errors="errors"
    @submit="submit"
  >
    <p v-if="formError" role="alert" class="text-sm text-red-11">{{ formError }}</p>
    <FieldRoot name="username" required>
      <FieldLabel>Username</FieldLabel>
      <FieldControl as-child>
        <TextField v-model="username" required placeholder="taken or offline" />
      </FieldControl>
      <FieldError />
    </FieldRoot>
    <Button type="submit">Save</Button>
  </FormRoot>
</template>
