<script setup lang="ts">
import { ref } from 'vue'
import { RadioCardsRoot, RadioCardsItem } from '#components'

const selected = ref<string>('1')
</script>

<template>
  <div class="max-w-[600px] text-sm">
    <RadioCardsRoot v-model="selected" class="flex items-center gap-2">
      <RadioCardsItem value="1">
        <div class="flex flex-col">
          <div class="font-bold">8-core CPU</div>
          <p>32GB RAM</p>
        </div>
      </RadioCardsItem>
      <RadioCardsItem value="2">
        <div class="flex flex-col">
          <div class="font-bold">6-core CPU</div>
          <p>24GB RAM</p>
        </div>
      </RadioCardsItem>
      <RadioCardsItem value="3">
        <div class="flex flex-col">
          <div class="font-bold">4-core CPU</div>
          <p>16GB RAM</p>
        </div>
      </RadioCardsItem>
    </RadioCardsRoot>
  </div>
</template>
