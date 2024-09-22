<script lang="ts">
import type { ScrollAreaRootProps } from 'radix-vue'
import type { RadiusType } from './types'

export interface ScrollAreaProps extends ScrollAreaRootProps {
  size?: '1' | '2' | '3'
  radius?: RadiusType
  scrollbars?: 'vertical' | 'horizontal' | 'both'
}

</script>

<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
  ScrollAreaViewport,
} from 'radix-vue'

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  size: '1',
  scrollbars: 'both',
})
</script>

<template>
  <ScrollAreaRoot
    class="ui-ScrollArea"
    :as-child="props.asChild"
    :dir="props.dir"
    :scroll-hide-delay="props.scrollHideDelay"
    :type="props.type"
    :data-radius="props.radius"
  >
    <ScrollAreaViewport class="ui-ScrollAreaViewport">
      <slot></slot>
    </ScrollAreaViewport>
    <div class="ui-ScrollAreaViewportFocusRing"></div>
    <ScrollAreaScrollbar
      v-if="props.scrollbars !== 'horizontal'"
      class="ui-ScrollAreaScrollbar"
      :data-size="props.size"
      orientation="vertical"
    >
      <ScrollAreaThumb class="ui-ScrollAreaThumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      v-if="props.scrollbars !== 'vertical'"
      class="ui-ScrollAreaScrollbar"
      :data-size="props.size"
      orientation="horizontal"
    >
      <ScrollAreaThumb class="ui-ScrollAreaThumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner
      v-if="props.scrollbars === 'both'"
      class-name="ui-ScrollAreaCorner"
    />
  </ScrollAreaRoot>
</template>

<style>
.radix-ui {
  --scrollarea-scrollbar-horizontal-margin-top: var(--space-1);
  --scrollarea-scrollbar-horizontal-margin-bottom: var(--space-1);
  --scrollarea-scrollbar-horizontal-margin-left: var(--space-1);
  --scrollarea-scrollbar-horizontal-margin-right: var(--space-1);
  --scrollarea-scrollbar-vertical-margin-top: var(--space-1);
  --scrollarea-scrollbar-vertical-margin-bottom: var(--space-1);
  --scrollarea-scrollbar-vertical-margin-left: var(--space-1);
  --scrollarea-scrollbar-vertical-margin-right: var(--space-1);
}

.ui-ScrollArea {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.ui-ScrollAreaViewport {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.ui-ScrollAreaViewport:where(:focus-visible) + :where(.ui-ScrollAreaViewportFocusRing) {
  position: absolute;
  inset: 0;
  pointer-events: none;
  outline: 2px solid var(--focus-8);
  outline-offset: -2px;
}

.ui-ScrollAreaViewport:where(:has(.ui-ScrollAreaScrollbar[data-orientation='horizontal'])) {
  overscroll-behavior-x: contain;
}

.ui-ScrollAreaScrollbar {
  display: flex;
  user-select: none;
  touch-action: none;
}

.ui-ScrollAreaScrollbar:where([data-orientation='vertical']) {
  flex-direction: column;
  width: var(--scrollarea-scrollbar-size);
}

.ui-ScrollAreaScrollbar:where([data-orientation='horizontal']) {
  flex-direction: row;
  height: var(--scrollarea-scrollbar-size);
}

.ui-ScrollAreaThumb {
  position: relative;
}
.ui-ScrollAreaThumb::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: var(--space-4);
  min-height: var(--space-4);
}

.ui-ScrollAreaScrollbar:where([data-size="1"]) {
  --scrollarea-scrollbar-size: var(--space-1);
  --scrollarea-scrollbar-border-radius: max(var(--radius-1), var(--radius-full));
}
.ui-ScrollAreaScrollbar:where([data-size="2"]) {
  --scrollarea-scrollbar-size: var(--space-2);
  --scrollarea-scrollbar-border-radius: max(var(--radius-1), var(--radius-full));
}
.ui-ScrollAreaScrollbar:where([data-size="3"]) {
  --scrollarea-scrollbar-size: var(--space-3);
  --scrollarea-scrollbar-border-radius: max(var(--radius-1), var(--radius-full));
}

.ui-ScrollAreaScrollbar {
  background-color: var(--gray-a3);
  border-radius: var(--scrollarea-scrollbar-border-radius);
  animation-duration: 120ms;
  animation-timing-function: ease-out;
}
.ui-ScrollAreaScrollbar:where([data-state='visible']) {
  animation-name: ui-fade-in;
}
.ui-ScrollAreaScrollbar:where([data-state='hidden']) {
  animation-name: ui-fade-out;
}
.ui-ScrollAreaScrollbar:where([data-orientation='horizontal']) {
  margin-top: var(--scrollarea-scrollbar-horizontal-margin-top);
  margin-bottom: var(--scrollarea-scrollbar-horizontal-margin-bottom);
  margin-left: var(--scrollarea-scrollbar-horizontal-margin-left);
  margin-right: var(--scrollarea-scrollbar-horizontal-margin-right);
}
.ui-ScrollAreaScrollbar:where([data-orientation='vertical']) {
  margin-top: var(--scrollarea-scrollbar-vertical-margin-top);
  margin-bottom: var(--scrollarea-scrollbar-vertical-margin-bottom);
  margin-left: var(--scrollarea-scrollbar-vertical-margin-left);
  margin-right: var(--scrollarea-scrollbar-vertical-margin-right);
}
.ui-ScrollAreaThumb {
  background-color: var(--gray-a8);
  border-radius: inherit;
  transition: background-color 100ms;
}
.ui-ScrollAreaThumb:hover {
  background-color: var(--gray-a9);
}
</style>
