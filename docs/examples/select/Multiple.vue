<script setup lang="ts">
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  } from '#components'
</script>

<template>
  <SelectRoot multiple>
    <SelectTrigger placeholder="Select..." />
    <SelectContent>
      <SelectItem value="orange">Orange</SelectItem>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="grape">Grape</SelectItem>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="potato">Potato</SelectItem>
    </SelectContent>
  </SelectRoot>
</template>
