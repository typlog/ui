<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'

export interface FieldErrorProps {
  as?: AsTag | Component
  asChild?: boolean
  match?: keyof ValidityState
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { injectFieldContext } from './context'

const props = withDefaults(defineProps<FieldErrorProps>(), { as: 'p' })
const field = injectFieldContext()
const errors = computed(() => {
  if (props.match && field.validity.value?.[props.match] !== true) return []
  return field.errors.value
})
</script>

<template>
  <Primitive
    v-if="errors.length"
    :id="field.errorId.value"
    class="ui-FieldError"
    :as="props.as"
    :as-child="props.asChild"
    :data-invalid="true"
  >
    <slot :errors="errors">
      <span v-for="error in errors" :key="error">{{ error }}</span>
    </slot>
  </Primitive>
</template>
