<script lang="ts">
export interface TableProps {
  size?: '1' | '2' | '3'
  variant?: 'surface' | 'ghost'
  layout?: 'auto' | 'fixed'
}
</script>

<script setup lang="ts">
import ScrollArea from '../scrollarea/ScrollArea.vue'

const props = withDefaults(defineProps<TableProps>(), {
  size: '2',
  variant: 'ghost',
})
</script>

<template>
  <div
    class="ui-Table"
    :data-size="props.size"
    :data-variant="props.variant"
  >
    <ScrollArea>
      <table
        class="ui-TableContent"
        :data-layout="props.layout"
      >
        <slot></slot>
      </table>
    </ScrollArea>
  </div>
</template>

<style>
.ui-TableContent {
  --table-row-background-color: transparent;
  --table-row-box-shadow: inset 0 -1px var(--gray-a5);

  width: 100%;
  text-align: left;
  vertical-align: top;
  border-collapse: collapse;
  border-radius: calc(var(--table-border-radius) - 1px);
  border-spacing: 0;
  box-sizing: border-box;

  /* Makes "height: 100%" work on content inside cells */
  height: 0;
}

.ui-TableContent tr {
  color: var(--gray-12);
}

.ui-TableContent td,
.ui-TableContent th {
  background-color: var(--table-row-background-color);
  box-shadow: var(--table-row-box-shadow);
  box-sizing: border-box;
  padding: var(--table-cell-padding);
  min-height: var(--table-cell-min-height);
}

.ui-TableContent thead th {
  font-weight: bold;
}

.ui-TableContent tbody th {
  font-weight: normal;
}

.ui-TableContent button {
  vertical-align: middle;
}

.ui-Table[data-size="1"] {
  --table-border-radius: var(--radius-3);
  --table-cell-padding: var(--space-2);
  --table-cell-min-height: calc(36px * var(--scaling));
}
.ui-Table[data-size="1"] .ui-TableContent {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
}
.ui-Table[data-size="2"] {
  --table-border-radius: var(--radius-4);
  --table-cell-padding: var(--space-3);
  --table-cell-min-height: calc(44px * var(--scaling));
}
.ui-Table[data-size="2"] .ui-TableContent {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
}
.ui-Table[data-size="3"] {
  --table-border-radius: var(--radius-4);
  --table-cell-padding: var(--space-3) var(--space-4);
  --table-cell-min-height: var(--space-8);
}
.ui-Table[data-size="3"] .ui-TableContent {
  font-size: var(--font-size-3);
  line-height: var(--line-height-3);
}

.ui-Table:where([data-variant="surface"]) {
  box-sizing: border-box;
  border: 1px solid var(--gray-a5);
  border-radius: var(--table-border-radius);
  background-color: var(--color-panel);
  backdrop-filter: var(--backdrop-filter-panel);
  background-clip: padding-box;
  position: relative;
}
@supports (box-shadow: 0 0 0 1px color-mix(in oklab, white, black)) {
  .ui-Table:where([data-variant="surface"]) {
    border-color: color-mix(in oklab, var(--gray-a5), var(--gray-6));
  }
}
.ui-Table:where([data-variant="surface"]) .ui-TableContent {
  overflow: hidden;
}
.ui-Table:where([data-variant="surface"]) thead {
  --table-row-background-color: var(--gray-a2);
}
.ui-Table:where([data-variant="surface"]) tbody :where(tr:last-child) {
  --table-row-box-shadow: none;
}

.ui-Table:where([data-variant="ghost"]) {
  --scrollarea-scrollbar-horizontal-margin-left: 0;
  --scrollarea-scrollbar-horizontal-margin-right: 0;
}
</style>
