<script setup lang="ts">
import { TextField } from '#components'
</script>


<template>
  <div class="flex flex-col gap-4">
    <div class="w-80">
      <TextField type="text" />
    </div>
    <div class="w-80">
      <TextField type="url" />
    </div>
    <div class="w-80">
      <TextField type="email" />
    </div>
    <div class="w-80">
      <TextField type="number" />
    </div>
    <div class="w-80">
      <TextField type="tel" />
    </div>
    <div class="w-80">
      <TextField type="password" />
    </div>
    <div class="w-80">
      <TextField type="search" />
    </div>
    <div class="w-80">
      <TextField type="date" />
    </div>
    <div class="w-80">
      <TextField type="datetime-local" />
    </div>
    <div class="w-80">
      <TextField type="month" />
    </div>
    <div class="w-80">
      <TextField type="time" />
    </div>
    <div class="w-80">
      <TextField type="week" />
    </div>
    <div class="w-80">
      <TextField type="file" />
    </div>
  </div>
</template>
