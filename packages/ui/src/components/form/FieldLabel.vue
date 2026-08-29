<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'

export interface FieldLabelProps {
  as?: AsTag | Component
  asChild?: boolean
  for?: string
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { injectFieldContext } from './context'

const props = withDefaults(defineProps<FieldLabelProps>(), { as: 'label' })
const field = injectFieldContext()
</script>

<template>
  <Primitive
    class="ui-FieldLabel"
    :as="props.as"
    :as-child="props.asChild"
    :for="props.for || field.controlId.value"
  >
    <slot></slot>
  </Primitive>
</template>
