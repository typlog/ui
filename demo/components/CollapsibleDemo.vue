<script setup lang="ts">
import {
  CollapsibleRoot,
  CollapsibleChevron,
  CollapsibleTrigger,
  CollapsibleContent,
} from '../../src'
</script>

<template>
  <div class="mt-2 flex gap-4">
    <CollapsibleRoot>
      <div class="flex items-center gap-2">
        <CollapsibleTrigger>Trigger 1</CollapsibleTrigger>
        <CollapsibleChevron />
      </div>
      <CollapsibleContent>
        <div class="p-4 bg-gray-100">Content 1</div>
      </CollapsibleContent>
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
