<script setup lang="ts">
import {
  SelectRoot,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from '#components'
</script>

<template>
  <section class="my-6">
    <h1 class="text-lg font-semibold">Select</h1>
    <div class="mt-2 flex gap-4">
      <SelectRoot>
        <SelectTrigger placeholder="Select ...">
          <template v-slot="{ selectedLabel }">
            <span>selected: {{ selectedLabel.join(', ') }}</span>
          </template>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">America</SelectItem>
          <SelectItem value="b">Banana</SelectItem>
          <SelectItem value="c">China</SelectItem>
          <SelectItem value="d">Deno</SelectItem>
        </SelectContent>
      </SelectRoot>

      <SelectRoot>
        <SelectTrigger placeholder="Select ..." />
        <SelectContent
          position="popper"
          side="bottom"
        >
          <SelectItem value="a">America</SelectItem>
          <SelectItem value="b">Banana</SelectItem>
          <SelectItem value="c">China</SelectItem>
          <SelectItem value="d">Deno</SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  </section>
</template>
