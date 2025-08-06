<script lang="ts">
import type { ButtonProps } from '../button/Button.vue'

export interface DialogCloseButtonProps extends ButtonProps {
  tooltip?: string
}
</script>

<script setup lang="ts">
import { DialogClose } from 'reka-ui'
import CrossIcon from '~icons/radix-icons/cross-2'
import Tooltip from '../tooltip/Tooltip.vue'
import IconButton from '../button/IconButton.vue'
import { useForwardPropsWithout } from '../util'

const props = withDefaults(defineProps<DialogCloseButtonProps>(), {
  tooltip: 'Close',
  as: 'button',
  size: '2',
  variant: 'ghost',
  color: 'gray',
  highContrast: false,
})
const forwarded = useForwardPropsWithout(props, ['tooltip'])
</script>

<template>
  <Tooltip :content="props.tooltip" as-child>
    <DialogClose class="ui-DialogCloseButton" as-child>
      <IconButton v-bind="forwarded">
        <CrossIcon />
      </IconButton>
    </DialogClose>
  </Tooltip>
</template>

<style>
@layer components {
  .ui-DialogCloseButton {
    position: absolute;
    top: calc(var(--dialog-popup-padding) / 2);
    right: calc(var(--dialog-popup-padding) / 2);
  }
}
</style>
