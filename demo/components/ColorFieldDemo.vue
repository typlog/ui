<script setup lang="ts">
import { ref } from 'vue'
import {
  ColorField,
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
    <ColorField radius="none" v-model="color" />
    <ColorField radius="small" v-model="color" />
    <ColorField radius="medium" v-model="color" />
    <ColorField radius="large" v-model="color" />
    <ColorField radius="full" v-model="color" />
  </div>
  <div class="mt-2 flex gap-4">
    <ColorField radius="none" variant="outline" v-model="color" />
    <ColorField radius="small" variant="outline" v-model="color" />
    <ColorField radius="medium" variant="outline" v-model="color" />
    <ColorField radius="large" variant="outline" v-model="color" />
    <ColorField radius="full" variant="outline" v-model="color" />
  </div>
</template>
