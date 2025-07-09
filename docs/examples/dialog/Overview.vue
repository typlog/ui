<script setup lang="ts">
import {
  Button,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  TextField,
} from '#components'
</script>

<template>
  <DialogRoot>
    <Button :as="DialogTrigger">Edit profile</Button>
    <DialogContent maxWidth="450px">
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
      <div class="flex flex-col gap-3 mt-4">
        <label>
          <span class="block text-sm font-semibold mb-1">Name</span>
          <TextField model-value="Freja Johnsen" placeholder="Enter your full name" />
        </label>
        <label>
          <span class="block text-sm font-semibold mb-1">Email</span>
          <TextField model-value="freja@example.com" placeholder="Enter your email" />
        </label>
      </div>
      <div class="flex mt-4 justify-end gap-3">
        <DialogClose as-child>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose as-child>
          <Button>Save</Button>
        </DialogClose>
      </div>
    </DialogContent>
  </DialogRoot>
</template>
