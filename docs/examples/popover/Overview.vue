<script setup lang="ts">
import {
  Button,
  PopoverRoot,
  PopoverTrigger,
  PopoverPopup,
  PopoverClose,
  TextField,
} from '#components'
</script>

<template>
  <PopoverRoot>
    <Button :as="PopoverTrigger">Edit profile</Button>
    <PopoverPopup class="w-96 p-0">
      <div class="p-4">
        <h2 class="font-medium">Edit profile</h2>
        <p>Make changes to your profile.</p>
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
        <Button variant="classic" color="gray" :as="PopoverClose">Cancel</Button>
        <Button>Save</Button>
      </div>
    </PopoverPopup>
  </PopoverRoot>
</template>
