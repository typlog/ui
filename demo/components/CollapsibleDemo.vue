<script setup lang="ts">
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  ChevronIcon,
} from '../../src'
</script>

<template>
  <div class="mt-2 flex gap-4">
    <CollapsibleRoot>
      <div class="flex items-center gap-2">
        <CollapsibleTrigger>Trigger 1</CollapsibleTrigger>
        <CollapsibleTrigger>
          <ChevronIcon />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>Content 1</CollapsibleContent>
    </CollapsibleRoot>
    <CollapsibleRoot>
      <div class="flex items-center gap-2">
        <CollapsibleTrigger>Trigger 2</CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div class="p-4 bg-gray-100">Content 2</div>
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
