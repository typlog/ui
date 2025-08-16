<script setup lang="ts">
import {
  Card,
  Button,
  TextField,
} from '#components'
</script>

<template>
  <Card size="4">
    <h2 class="font-bold mb-4">Sign In</h2>
    <div class="flex flex-col gap-1 mb-4">
      <label class="text-sm font-medium" for="example-email-field">Email address</label>
      <TextField id="example-email-field" placeholder="Enter your email" />
    </div>
    <div class="flex flex-col gap-1 mb-4">
      <label class="text-sm font-medium" for="example-email-password">Password</label>
      <TextField id="example-email-password" placeholder="Enter your password" />
    </div>
    <div class="flex gap-2 justify-end mt-8">
      <Button variant="outline">Create an account</Button>
      <Button>Sign in</Button>
    </div>
  </Card>
</template>
