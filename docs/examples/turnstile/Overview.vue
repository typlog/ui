<script setup lang="ts">
import { ref } from 'vue'
import { Turnstile } from '@typlog/ui/addons'

const token = ref('')
</script>

<template>
  <Turnstile v-model="token" sitekey="0x4AAAAAABmL8cu5eZ3JKoY-" />
</template>
