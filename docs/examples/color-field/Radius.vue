<script setup lang="ts">
import { ColorField } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <ColorField default-value="#3e63dd" radius="none" />
    <ColorField default-value="#3e63dd" radius="small" />
    <ColorField default-value="#3e63dd" radius="medium" />
    <ColorField default-value="#3e63dd" radius="large" />
    <ColorField default-value="#3e63dd" radius="full" />
  </div>
</template>
