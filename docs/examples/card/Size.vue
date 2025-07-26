<script setup lang="ts">
import { Card, Avatar } from '#components'

const picture = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
</script>

<template>
  <div class="flex flex-col gap-4 max-w-68">
    <Card size="1">
      <div class="flex items-center gap-3">
        <Avatar
          :src="picture"
          alt="Alex"
          size="3"
          radius="full"
        />
        <div class="text-sm">
          <div class="font-bold">Alex Wang</div>
          <div class="text-gray-10">Engineering</div>
        </div>
      </div>
    </Card>
    <Card size="2">
      <div class="flex items-center gap-3">
        <Avatar
          :src="picture"
          alt="Alex"
          size="3"
          radius="full"
        />
        <div class="text-sm">
          <div class="font-bold">Alex Wang</div>
          <div class="text-gray-10">Engineering</div>
        </div>
      </div>
    </Card>
    <Card size="3">
      <div class="flex items-center gap-3">
        <Avatar
          :src="picture"
          alt="Alex"
          size="3"
          radius="full"
        />
        <div class="text-sm">
          <div class="font-bold">Alex Wang</div>
          <div class="text-gray-10">Engineering</div>
        </div>
      </div>
    </Card>
  </div>
</template>
