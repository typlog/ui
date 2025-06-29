<script lang="ts">
import type { EditableRootProps, EditableRootEmits  } from 'reka-ui'
import { ColorType, RadiusType } from '../types'

export interface EditableProps extends EditableRootProps {
  /**
   * Overrides the radius inherited from the theme.
   * @defaultValue "small"
   */
  radius?: RadiusType
  /** Overrides the accent color inherited from the theme. */
  color?: ColorType
  /**
   * Control the size of the padding and radius.
   * @defaultValue "1"
   */
  size?: '1' | '2' | '3'
}
</script>

<script setup lang="ts">
import {
  EditableRoot,
  EditableArea,
  EditableInput,
  EditablePreview,
} from 'reka-ui'
import { extractForwardPropsEmits } from '../util'

const props = withDefaults(defineProps<EditableProps>(), {
  radius: 'small',
  size: '1',
})
const emits = defineEmits<EditableRootEmits>()
const [forwarded, resetClass] = extractForwardPropsEmits(props, emits, ['radius', 'color', 'size'])

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <EditableRoot
    class="ui-Editable"
    :class="resetClass"
    :data-accent-color="props.color"
    v-bind="forwarded"
  >
    <EditableArea class="ui-EditableArea" v-bind="$attrs">
      <EditablePreview class="ui-EditablePreview" />
      <EditableInput class="ui-EditableInput" />
    </EditableArea>
  </EditableRoot>
</template>

<style>
.ui-Editable:where(.r-size-1) {
  --editable-padding-x: var(--space-1);
  --editable-border-radius: max(var(--radius-2), var(--radius-full));
}
.ui-Editable:where(.r-size-2) {
  --editable-padding-x: var(--space-2);
  --editable-border-radius: max(var(--radius-2), var(--radius-full));
}
.ui-Editable:where(.r-size-3) {
  --editable-padding-x: var(--space-3);
  --editable-border-radius: max(var(--radius-3), var(--radius-full));
}
.ui-EditableArea {
  padding-left: var(--editable-padding-x);
  padding-right: var(--editable-padding-x);
  border-radius: var(--editable-border-radius);
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-EditableArea:where([data-focused]),
.ui-EditableArea:where(:hover) {
  background-color: var(--accent-a3);
}
.ui-EditablePreview {
  white-space: pre;
  user-select: none;
}
.ui-EditableInput {
  outline: none;
  max-width: 100%;
}
</style>
