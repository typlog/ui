<script setup lang="ts">
import { ColorField } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <ColorField default-value="#3e63dd" variant="solid" radius="full" />
    <ColorField default-value="#3e63dd" variant="ring" radius="full" />
  </div>
</template>
