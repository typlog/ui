<script setup lang="ts">
import { ref } from 'vue'
import {
  Icon,
  ColorField,
  TextField,
} from '../../src'

const color = ref('#AA99EC')
</script>

<template>
  <div class="mt-2 flex gap-4">
    <ColorField size="1" v-model="color" />
    <ColorField size="2" v-model="color" />
    <ColorField size="3" v-model="color" />
  </div>
  <div class="mt-2 flex gap-4">
    <ColorField size="1" radius="full" variant="ring" v-model="color" />
    <ColorField size="2" radius="full" variant="ring" v-model="color" />
    <ColorField size="3" radius="full" variant="ring" v-model="color" />
  </div>
  <div class="mt-2 flex gap-4">
    <ColorField radius="none" v-model="color" />
    <ColorField radius="small" v-model="color" />
    <ColorField radius="medium" v-model="color" />
    <ColorField radius="large" v-model="color" />
    <ColorField radius="full" v-model="color" />
  </div>
  <div class="mt-2 flex gap-4">
    <ColorField radius="none" variant="ring" v-model="color" />
    <ColorField radius="small" variant="ring" v-model="color" />
    <ColorField radius="medium" variant="ring" v-model="color" />
    <ColorField radius="large" variant="ring" v-model="color" />
    <ColorField radius="full" variant="ring" v-model="color" />
  </div>
  <div class="mt-2 flex gap-4">
    <TextField v-model="color">
      <template #left>
        <ColorField v-model="color" />
      </template>
    </TextField>
    <TextField v-model="color">
      <template #right>
        <ColorField v-model="color" />
      </template>
    </TextField>
    <TextField v-model="color">
      <template #left>
        <Icon icon="lucide:palette" />
      </template>
      <template #right>
        <ColorField v-model="color" />
      </template>
    </TextField>
  </div>
</template>
