<script lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { useForwardExpose, useForwardProps, RadioGroupItem } from 'reka-ui'

const props = defineProps<RadioGroupItemProps>()
const forwarded = useForwardProps(props)

useForwardExpose()
</script>

<template>
  <RadioGroupItem
    class="ui-RadioCardsItem ui-BaseCard"
    v-bind="{...forwarded, asChild: false}"
  >
    <slot></slot>
  </RadioGroupItem>
</template>

<style src="../card/style.css"></style>

<style>
.ui-RadioCardsItem {
  height: 100%;
}
.ui-RadioCardsItem:where([data-state="checked"]) {
  --card-border-color: var(--accent-10);
  box-shadow: 0 0 0 1px var(--accent-10);
}
</style>
