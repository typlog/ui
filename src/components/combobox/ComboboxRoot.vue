<script lang="ts">
import { toRefs, type Ref } from 'vue'
import { createContext } from 'reka-ui'
import type {
  ComboboxRootProps as RekaComboboxRootProps,
  ComboboxRootEmits,
} from 'reka-ui'
import type { ColorType } from '../types'

export interface ComboboxRootProps extends RekaComboboxRootProps {
  size?: '1' | '2' | '3'
  color?: ColorType
  highContrast?: boolean
}

interface ComboboxRootContext {
  size: Ref<'1' | '2' | '3'>
  color: Ref<ColorType | undefined>
  highContrast: Ref<boolean>
}

export const [injectComboboxRootContext, provideComboboxRootContext]
  = createContext<ComboboxRootContext>('ui:ComboboxRoot')
</script>

<script setup lang="ts">
import { ComboboxRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  multiple: false,
  size: '2',
})
const emits = defineEmits<ComboboxRootEmits>()
const { size, color, highContrast } = toRefs(props)

const forwarded = useForwardPropsEmitsWithout(props, emits, ['size', 'color', 'highContrast'])
const resetClass = buildPropsClass(props, ['size', 'highContrast', 'multiple'])

provideComboboxRootContext({
  size,
  color,
  highContrast,
})
</script>

<template>
  <ComboboxRoot
    class="ui-ComboboxRoot"
    :class="resetClass"
    v-bind="forwarded"
  >
    <slot></slot>
  </ComboboxRoot>
</template>

<style>
@layer components {
  .ui-ComboboxRoot {
    width: fit-content;
  }
  .ui-ComboboxRoot:where(.r-multiple) {
    width: auto;
  }
}

.ui-ComboboxRoot:where(.r-size-1) {
  --combobox-field-height: var(--space-5);
  --combobox-field-padding: calc(var(--space-1) * 1.5);
  --combobox-field-border-radius: max(var(--radius-2), var(--radius-full));
  --combobox-field-native-icon-size: var(--space-3);
  --combobox-field-font-size: var(--font-size-1);
  --combobox-field-letter-spacing: var(--letter-spacing-1);

  --combobox-trigger-gap: var(--space-2);
  --combobox-trigger-padding-x: var(--space-1);

  --combobox-decoration-container-padding-right: 0px;
  --combobox-decoration-container-margin-right: -2px;
}

.ui-ComboboxRoot:where(.r-size-2) {
  --combobox-field-height: var(--space-6);
  --combobox-field-padding: var(--space-2);
  --combobox-field-border-radius: max(var(--radius-2), var(--radius-full));
  --combobox-field-native-icon-size: var(--space-4);
  --combobox-field-font-size: var(--font-size-2);
  --combobox-field-letter-spacing: var(--letter-spacing-2);

  --combobox-trigger-gap: var(--space-2);
  --combobox-trigger-padding-x: var(--space-2);

  --combobox-decoration-container-padding-right: 2px;
  --combobox-decoration-container-margin-right: 0px;
}

.ui-ComboboxRoot:where(.r-size-3) {
  --combobox-field-height: var(--space-7);
  --combobox-field-padding: var(--space-3);
  --combobox-field-border-radius: max(var(--radius-3), var(--radius-full));
  --combobox-field-native-icon-size: var(--space-4);
  --combobox-field-font-size: var(--font-size-3);
  --combobox-field-letter-spacing: var(--letter-spacing-3);

  --combobox-trigger-gap: var(--space-3);
  --combobox-trigger-padding-x: var(--space-3);

  --combobox-decoration-container-padding-right: 5px;
  --combobox-decoration-container-margin-right: 0px;
}
</style>
