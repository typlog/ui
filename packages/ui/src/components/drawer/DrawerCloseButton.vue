<script lang="ts">
import type { ButtonProps } from '../button/Button.vue'

export interface DrawerCloseButtonProps extends ButtonProps {
  tooltip?: string
}
</script>

<script setup lang="ts">
import { DrawerClose } from 'reka-ui'
import CrossIcon from '~icons/radix-icons/cross-2'
import Tooltip from '../tooltip/Tooltip.vue'
import IconButton from '../button/IconButton.vue'
import { useForwardPropsWithout } from '../util'
const props = withDefaults(defineProps<DrawerCloseButtonProps>(), {
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
    <DrawerClose class="ui-DrawerCloseButton" as-child>
      <IconButton v-bind="forwarded">
        <CrossIcon />
      </IconButton>
    </DrawerClose>
  </Tooltip>
</template>
