<script lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { useForwardExpose, useForwardProps, RadioGroupItem } from 'reka-ui'
import { injectRadioGroupRootContext } from './RadioGroupRoot.vue'
import Card from '../card/Card.vue'

const props = defineProps<RadioGroupItemProps>()
const forwarded = useForwardProps(props)

useForwardExpose()

const rootContext = injectRadioGroupRootContext()
</script>

<template>
  <RadioGroupItem
    class="ui-RadioCardsItem"
    :data-accent-color="rootContext.color?.value"
    :data-size="rootContext.size.value"
    :data-variant="rootContext.variant.value"
    :data-high-contrast="rootContext.highContrast?.value"
    v-bind="{...forwarded, asChild: false}"
  >
    <Card :as-child="forwarded.asChild">
      <slot></slot>
    </Card>
  </RadioGroupItem>
</template>


<style>
.ui-RadioCardsItem .ui-Card {
  width: 100%;
  height: 100%;
}
.ui-RadioCardsItem:where([data-state="checked"]) .ui-Card {
  --card-border-color: var(--accent-10);
  box-shadow: 0 0 0 1px var(--accent-10);
}
</style>
