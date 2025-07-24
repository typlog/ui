<script setup lang="ts">
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <CollapsibleRoot variant="ghost">
      <CollapsibleTrigger>
        What is @typlog/ui?
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p><code>@typlog/ui</code> extends <code>reka-ui</code> with pre-styled components and uses Radix Colors for consistent theming.</p>
      </CollapsibleContent>
    </CollapsibleRoot>

    <CollapsibleRoot variant="soft">
      <CollapsibleTrigger>
        What is @typlog/ui?
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p><code>@typlog/ui</code> extends <code>reka-ui</code> with pre-styled components and uses Radix Colors for consistent theming.</p>
      </CollapsibleContent>
    </CollapsibleRoot>

    <CollapsibleRoot variant="surface">
      <CollapsibleTrigger>
        What is @typlog/ui?
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p><code>@typlog/ui</code> extends <code>reka-ui</code> with pre-styled components and uses Radix Colors for consistent theming.</p>
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
