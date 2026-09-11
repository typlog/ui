<script setup lang="ts">
import { Callout } from '@typlog/ui'
</script>

<template>
  <div class="grid gap-3">
    <Callout color="blue" icon="lucide:info" variant="soft">
      Soft callouts work well for supporting information.
    </Callout>
    <Callout color="green" icon="lucide:circle-check" variant="surface">
      Surface callouts add definition against similar backgrounds.
    </Callout>
    <Callout color="amber" icon="lucide:triangle-alert" variant="outline" high-contrast>
      Outline callouts keep the surrounding surface visible.
    </Callout>
  </div>
</template>
