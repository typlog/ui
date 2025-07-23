<script setup lang="ts">
import { ref } from 'vue'
import { Turnstile } from '#addons'

const token = ref('')
</script>

<template>
  <Turnstile v-model="token" sitekey="0x4AAAAAABmL8cu5eZ3JKoY-" />
</template>
