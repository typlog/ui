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
const sent = ref(false)
</script>

<template>
  <FormRoot class="flex max-w-sm flex-col gap-4" @submit="sent = true">
    <FieldRoot name="email" required>
      <FieldLabel>Email address</FieldLabel>
      <FieldControl as-child>
        <TextField v-model="email" type="email" required placeholder="you@example.com" />
      </FieldControl>
      <FieldDescription>Enter a valid email address.</FieldDescription>
      <FieldError />
    </FieldRoot>
    <div class="flex gap-2">
      <Button type="submit">Sign in</Button>
      <Button type="reset" variant="soft">Reset</Button>
    </div>
    <p v-if="sent" class="text-sm text-green-11">Native validation passed.</p>
  </FormRoot>
</template>
