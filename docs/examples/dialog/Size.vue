<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  DialogRoot,
  DialogTrigger,
  DialogPopup,
} from '#components'

type PopupSize = '1' | '2' | '3' | '4' | '5'

const size = ref<PopupSize>('1')
</script>

<template>
  <DialogRoot>
    <div class="flex items-center gap-4">
      <Button :as="DialogTrigger" variant="soft" @click="size='1'">Size 1</Button>
      <Button :as="DialogTrigger" variant="soft" @click="size='2'">Size 2</Button>
      <Button :as="DialogTrigger" variant="soft" @click="size='3'">Size 3</Button>
      <Button :as="DialogTrigger" variant="soft" @click="size='4'">Size 4</Button>
      <Button :as="DialogTrigger" variant="soft" @click="size='5'">Size 5</Button>
    </div>
    <DialogPopup :size="size">
      <p>The quick brown fox jumps over the lazy dog.</p>
    </DialogPopup>
  </DialogRoot>
</template>
