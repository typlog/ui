<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ToggleGroupRoot, ToggleGroupItem } from '#components'

const selected = ref<string>('blog')
</script>

<template>
  <div class="flex items-podcast gap-2">
    <ToggleGroupRoot v-model="selected" variant="solid">
      <ToggleGroupItem value="blog">
        <Icon icon="lucide:file-text" />
      </ToggleGroupItem>
      <ToggleGroupItem value="podcast">
        <Icon icon="lucide:podcast" />
      </ToggleGroupItem>
      <ToggleGroupItem value="photo">
        <Icon icon="lucide:file-image" />
      </ToggleGroupItem>
    </ToggleGroupRoot>

    <ToggleGroupRoot v-model="selected" variant="surface">
      <ToggleGroupItem value="blog">
        <Icon icon="lucide:file-text" />
      </ToggleGroupItem>
      <ToggleGroupItem value="podcast">
        <Icon icon="lucide:podcast" />
      </ToggleGroupItem>
      <ToggleGroupItem value="photo">
        <Icon icon="lucide:file-image" />
      </ToggleGroupItem>
    </ToggleGroupRoot>

    <ToggleGroupRoot v-model="selected" variant="soft">
      <ToggleGroupItem value="blog">
        <Icon icon="lucide:file-text" />
      </ToggleGroupItem>
      <ToggleGroupItem value="podcast">
        <Icon icon="lucide:podcast" />
      </ToggleGroupItem>
      <ToggleGroupItem value="photo">
        <Icon icon="lucide:file-image" />
      </ToggleGroupItem>
    </ToggleGroupRoot>

    <ToggleGroupRoot v-model="selected" variant="outline">
      <ToggleGroupItem value="blog">
        <Icon icon="lucide:file-text" />
      </ToggleGroupItem>
      <ToggleGroupItem value="podcast">
        <Icon icon="lucide:podcast" />
      </ToggleGroupItem>
      <ToggleGroupItem value="photo">
        <Icon icon="lucide:file-image" />
      </ToggleGroupItem>
    </ToggleGroupRoot>

    <ToggleGroupRoot v-model="selected" variant="ghost">
      <ToggleGroupItem value="blog">
        <Icon icon="lucide:file-text" />
      </ToggleGroupItem>
      <ToggleGroupItem value="podcast">
        <Icon icon="lucide:podcast" />
      </ToggleGroupItem>
      <ToggleGroupItem value="photo">
        <Icon icon="lucide:file-image" />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  </div>
</template>
