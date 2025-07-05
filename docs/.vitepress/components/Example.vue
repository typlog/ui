<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <div class="vp-Example">
    <div class="vp-ExampleRun">
      <slot></slot>
    </div>
    <div class="vp-ExampleSource">
      <slot name="source"></slot>
    </div>
  </div>
</template>

<style>
.vp-Example {
  margin-top: var(--space-4);
  margin-bottom: var(--space-6);
  border: 1px solid var(--gray-a4);
  border-radius: var(--radius-4);
}
.vp-ExampleRun {
  padding: var(--space-4);
  border-bottom: 1px solid var(--gray-a4);
}
.vp-ExampleSource {
  --vp-code-block-bg: transparent;
  --vp-code-line-height: 1.6;
  --vp-code-font-size: 14px;
  background: var(--accent-a2);
}
.vp-ExampleSource div.language-vue {
  margin-top: 0;
  margin-bottom: 0;
}
.vp-ExampleSource span.lang {
  display: none;
}
</style>
