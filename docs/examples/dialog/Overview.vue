<script setup lang="ts">
import {
  Button,
  DialogRoot,
  DialogTrigger,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  TextField,
} from '#components'
</script>

<template>
  <DialogRoot>
    <Button :as="DialogTrigger">Edit profile</Button>
    <DialogPopup class="p-0">
      <div class="p-4">
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile.</DialogDescription>
      </div>
      <div class="flex flex-col gap-3 p-4 pb-8">
        <label>
          <span class="block text-sm font-semibold mb-1">Name</span>
          <TextField model-value="Freja Johnsen" placeholder="Enter your full name" />
        </label>
        <label>
          <span class="block text-sm font-semibold mb-1">Email</span>
          <TextField model-value="freja@example.com" placeholder="Enter your email" />
        </label>
      </div>
      <div class="flex p-4 justify-end gap-3 bg-gray-3">
        <Button variant="classic" color="gray" :as="DialogClose">Cancel</Button>
        <Button>Save</Button>
      </div>
    </DialogPopup>
  </DialogRoot>
</template>
