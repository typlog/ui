<script setup lang="ts">
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <CollapsibleRoot variant="soft" size="1">
      <CollapsibleTrigger>
        What is @typlog/ui?
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p><code>@typlog/ui</code> extends <code>reka-ui</code> with pre-styled components and uses Radix Colors for consistent theming.</p>
      </CollapsibleContent>
    </CollapsibleRoot>

    <CollapsibleRoot variant="soft" size="2">
      <CollapsibleTrigger>
        What is @typlog/ui?
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p><code>@typlog/ui</code> extends <code>reka-ui</code> with pre-styled components and uses Radix Colors for consistent theming.</p>
      </CollapsibleContent>
    </CollapsibleRoot>

    <CollapsibleRoot variant="soft" size="3">
      <CollapsibleTrigger>
        What is @typlog/ui?
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p><code>@typlog/ui</code> extends <code>reka-ui</code> with pre-styled components and uses Radix Colors for consistent theming.</p>
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
