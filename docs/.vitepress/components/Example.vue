<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '#components'

defineProps<{ name: string }>()

const expanded = ref(false)
</script>

<template>
  <div class="vp-Example">
    <div class="vp-ExampleComponent">
      <ScrollArea scrollbars="horizontal">
        <slot></slot>
      </ScrollArea>
    </div>
    <div class="vp-ExampleSource" :data-expanded="expanded">
      <ScrollArea scrollbars="horizontal">
        <slot name="source"></slot>
      </ScrollArea>
    </div>
    <button class="vp-ExampleAction" @click.prevent="expanded = !expanded">
      <span v-if="expanded">Hide code</span>
      <span v-else>Show code</span>
    </button>
  </div>
</template>

<style>
:root {
  --example-mask: linear-gradient(#fff0, #fff9);
}
.dark {
  --example-mask: linear-gradient(#0000, #0009);
}
.vp-Example {
  margin-top: var(--space-4);
  margin-bottom: var(--space-6);
  border: 1px solid var(--gray-a4);
  border-radius: var(--radius-4);
  overflow: hidden;
}
.vp-ExampleComponent {
  border-bottom: 1px solid var(--gray-a4);
  width: 100%;
  box-sizing: border-box;
}
.vp-ExampleComponent .ui-ScrollAreaViewport {
  padding: var(--space-3) var(--space-4);
}
.vp-ExampleSource {
  --vp-code-block-bg: transparent;
  --vp-code-line-height: 1.6;
  --vp-code-font-size: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  outline: 0;
}
.vp-ExampleSource[data-expanded="false"]:before {
  position: absolute;
  content: "";
  pointer-events: none;
  background: var(--example-mask);
  height: 7.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.vp-ExampleSource[data-expanded="false"] .ui-ScrollAreaViewport {
  max-height: calc(8.75lh + .5rem);
  overflow: hidden;
}
.vp-Example .vp-ExampleSource div.language-vue {
  margin: 0;
}
.vp-Example .vp-ExampleSource pre.shiki {
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
}
.vp-Example .vp-ExampleSource .shiki code {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}
.vp-ExampleSource span.lang {
  display: none;
}
.vp-ExampleSource button.copy {
  width: 28px !important;
  height: 28px !important;
  background-size: 14px !important;
}
.vp-ExampleSource button.copy:before {
  height: 28px !important;
}
.vp-ExampleAction {
  width: 100%;
  font-size: 13px;
  border-top: 1px solid var(--gray-a4);
  background: var(--gray-2);
  color: var(--gray-11);
  padding: var(--space-1);
}
</style>
