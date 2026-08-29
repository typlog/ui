<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'

export interface FieldDescriptionProps {
  as?: AsTag | Component
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { Primitive } from 'reka-ui'
import { injectFieldContext } from './context'

const props = withDefaults(defineProps<FieldDescriptionProps>(), { as: 'p' })
const field = injectFieldContext()

onMounted(() => field.setDescriptionPresent(true))
onBeforeUnmount(() => field.setDescriptionPresent(false))
</script>

<template>
  <Primitive
    :id="field.descriptionId.value"
    class="ui-FieldDescription"
    :as="props.as"
    :as-child="props.asChild"
  >
    <slot></slot>
  </Primitive>
</template>
