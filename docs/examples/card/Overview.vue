<script setup lang="ts">
import { Card, Avatar } from '#components'
</script>

<template>
  <div class="max-w-60">
    <Card>
      <div class="flex items-center gap-3">
        <Avatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
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
