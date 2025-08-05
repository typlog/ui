<script lang="ts">
import type{
  ComboboxInputProps as RekaComboboxInputProps,
  ComboboxInputEmits,
  AcceptableValue,
  AcceptableInputValue,
} from 'reka-ui'
import type { RadiusType } from '../types'

export interface ComboboxInputProps extends RekaComboboxInputProps {
  variant?: 'surface' | 'soft'
  radius?: RadiusType
  placeholder?: string
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxTrigger,
  useForwardPropsEmits,
  injectComboboxRootContext,
} from 'reka-ui'
import CrossIcon from '~icons/radix-icons/cross-2'
import ChevronDownIcon from '~icons/radix-icons/chevron-down'

defineOptions({
  inheritAttrs: false,
})

const context = injectComboboxRootContext()

const props = withDefaults(defineProps<ComboboxInputProps>(), {
  variant: 'surface',
})
const emits = defineEmits<ComboboxInputEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const activeIndex = ref<number>(-1)

const values = computed(() => {
  return context.modelValue.value as AcceptableInputValue[]
})

const displayValue = (value: AcceptableValue) => {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  } else {
    return value.toString()
  }
}

const onDeleteIndex = (index: number) => {
  activeIndex.value = index;
  (context.modelValue.value as AcceptableInputValue[]).splice(index, 1)
  activeIndex.value = -1
}

const onInputKeydown = (event: KeyboardEvent) => {
  const input = event.target as HTMLInputElement
  if (!input.value && (event.key === 'Delete' || event.key === 'Backspace')) {
    if (activeIndex.value !== -1) {
      onDeleteIndex(activeIndex.value)
    } else {
      activeIndex.value = values.value.length - 1
      setTimeout(() => {
        activeIndex.value = -1
      }, 800)
    }
  } else if (input.value && event.key === 'Enter') {
    setTimeout(() => {
      input.value = ''
    })
  }
}

watch(values, () => {
  context.filterSearch.value = ''
  emits('update:modelValue', '')
}, { deep: true })
</script>

<template>
  <ComboboxAnchor
    class="ui-ComboboxField"
    :class="`r-variant-${variant}`"
    :data-radius="radius"
    :data-multiple="context.multiple.value || undefined"
  >
    <div
      v-if="context.multiple.value"
      class="ui-ComboboxValues"
    >
      <div
        v-for="(item, index) in values"
        :key="displayValue(item)"
        class="ui-ComboboxValuesItem"
        :aria-current="index === activeIndex"
        :value="item"
      >
        <slot
          name="item"
          :value="item"
        >
          <span>{{ displayValue(item) }}</span>
        </slot>
        <button
          type="button"
          tabindex="-1"
          @click.prevent="onDeleteIndex(index)"
        >
          <CrossIcon />
        </button>
      </div>

      <ComboboxInput
        v-bind="{
          ...$attrs,
          ...forwarded,
          variant: undefined,
          radius: undefined,
        }"
        class="ui-ComboboxInput"
        @keydown="onInputKeydown"
      >
      </ComboboxInput>
    </div>

    <ComboboxInput
      v-else
      class="ui-ComboboxInput"
      v-bind="{
        ...$attrs,
        ...forwarded,
        variant: undefined,
        radius: undefined,
      }"
    />
    <ComboboxTrigger class="ui-ComboboxTrigger">
      <ChevronDownIcon />
    </ComboboxTrigger>
  </ComboboxAnchor>
</template>

<style>
.ui-ComboboxField {
  display: flex;
  align-items: stretch;
  font-weight: var(--font-weight-regular);
  font-style: normal;
  text-align: start;
  box-sizing: border-box;
  height: var(--combobox-field-height);
  padding: var(--combobox-field-border-width);
  border-radius: var(--combobox-field-border-radius);
  font-size: var(--combobox-field-font-size);
  letter-spacing: var(--combobox-field-letter-spacing);
}

.ui-ComboboxField:where([data-multiple="true"]) {
  height: auto;
}

.ui-ComboboxField::selection {
  background-color: var(--combobox-field-selection-color);
}

.ui-ComboboxValues {
  display: flex;
  padding: calc(var(--space-1) / 2);
  gap: var(--space-1);
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
}

.ui-ComboboxValuesItem {
  display: flex;
  gap: var(--space-1);
  align-items: center;
  height: calc(var(--combobox-field-height) - var(--space-1) * 2);
  padding: var(--combobox-field-padding);
  border-radius: calc(var(--combobox-field-border-radius) - var(--combobox-field-border-width));
  background-color: var(--accent-a9);
  color: var(--accent-contrast);
}

.ui-ComboboxValuesItem:where([aria-current="true"]) {
  background-color: var(--red-a9);
}

@layer components {
  .ui-ComboboxInput {
    text-align: inherit;
    border: none;
    padding: 0;
    width: 100%;
    font-size: 1em;
    background-color: transparent;
    border-radius: calc(var(--combobox-field-border-radius) - var(--combobox-field-border-width));
    text-indent: var(--combobox-field-padding);
    height: var(--combobox-input-height);
    cursor: auto;

    /* Reset size 2 padding bottom */
    padding-bottom: 0px;
    /* Safari credentials autofill icon */
  }
}

.ui-ComboboxField:where([data-multiple="true"]) :where(.ui-ComboboxInput) {
  text-indent: calc(var(--combobox-field-padding) / 2);
  height: calc(var(--combobox-field-height) - var(--space-1) * 2);
}

.ui-ComboboxValues :where(.ui-ComboboxInput) {
  width: auto;
}

.ui-ComboboxInput:focus {
  outline: none;
  box-shadow: none;
}
.ui-ComboboxInput::selection {
  background-color: var(--combobox-field-selection-color);
}
.ui-ComboboxInput:where(:autofill) {
  /* Reliably removes native autofill colors */
  background-clip: text;
  -webkit-text-fill-color: var(--gray-12);
}
.ui-ComboboxTrigger {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  order: 0;
  margin-left: 0;
  margin-right: calc(var(--combobox-field-border-width) * -1);
  height: var(--combobox-trigger-height);

  gap: var(--combobox-trigger-gap);
  padding-left: var(--combobox-trigger-padding-x);
  padding-right: var(--combobox-trigger-padding-x);
}

.ui-ComboboxInput::-webkit-textfield-decoration-container {
  padding-right: var(--combobox-decoration-container-padding-right);
  margin-right: var(--combobox-decoration-container-margin-right);
}

.ui-ComboboxField:where(.r-variant-surface) {
  --combobox-field-selection-color: var(--focus-a5);
  --combobox-field-focus-color: var(--focus-a8);
  --combobox-field-border-width: 1px;
  --combobox-field-border-color: var(--gray-a7);
  --combobox-input-height: calc(var(--combobox-field-height) - var(--space-1));
  --combobox-trigger-height: calc(var(--combobox-field-height) - var(--space-1));

  /* Blend inner shadow with page background */
  background-clip: content-box;
  background-color: var(--color-surface);
  box-sizing: border-box;
  border: var(--combobox-field-border-width) solid var(--combobox-field-border-color);
  color: var(--gray-12);
  padding: calc(var(--combobox-field-border-width) - var(--combobox-field-border-width));
}
@supports selector(:has(*)) {
  .ui-ComboboxField:where(.r-variant-surface):where(:has(.ui-ComboboxInput:focus)) {
    --combobox-field-border-color: var(--combobox-field-focus-color);
    box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
}
@supports not selector(:has(*)) {
  .ui-ComboboxField:where(.r-variant-surface):where(:focus-within) {
    --combobox-field-border-color: var(--combobox-field-focus-color);
    box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
}
.ui-ComboboxField:where(.r-variant-surface) :where(.ui-ComboboxInput)::placeholder {
  color: var(--gray-a10);
}
.ui-ComboboxField:where(.r-variant-surface) :where(.ui-ComboboxTrigger) {
  color: var(--gray-a11);
}
/* soft */
.ui-ComboboxField:where(.r-variant-soft) {
  --combobox-field-selection-color: var(--accent-a5);
  --combobox-field-focus-color: var(--accent-8);
  --combobox-field-border-width: 0px;
  --combobox-input-height: var(--combobox-field-height);
  --combobox-trigger-height: var(--combobox-field-height);

  background-color: var(--accent-a3);
  color: var(--accent-12);
  padding: var(--combobox-field-border-width);
}
@supports selector(:has(*)) {
  .ui-ComboboxField:where(.r-variant-soft):where(:has(.ui-ComboboxInput:focus)) {
    outline: 2px solid var(--combobox-field-focus-color);
    outline-offset: -1px;
  }
}
@supports not selector(:has(*)) {
  .ui-ComboboxField:where(.r-variant-soft):where(:focus-within) {
    outline: 2px solid var(--combobox-field-focus-color);
    outline-offset: -1px;
  }
}
.ui-ComboboxField:where(.r-variant-soft) :where(.ui-ComboboxInput)::placeholder {
  color: var(--accent-12);
  opacity: 0.6;
}
.ui-ComboboxField:where(.r-variant-soft) :where(.ui-ComboboxTrigger) {
  color: var(--accent-12);
}
.ui-ComboboxInput:where(:disabled, :read-only)::placeholder {
  opacity: 0.5;
}
.ui-ComboboxInput:where(:disabled, :read-only):where(:placeholder-shown) {
  cursor: var(--cursor-disabled);
}
.ui-ComboboxInput:where(:disabled, :read-only):where(:placeholder-shown) ~ :where(.ui-ComboboxTrigger) {
  cursor: var(--cursor-disabled);
}
</style>
