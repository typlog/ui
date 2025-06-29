<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { RadiusType } from '../types'

type BrandType = 'google' | 'facebook' | 'x' | 'github' | 'apple' | 'slack' | 'figma'

const BRAND_ICONS: Record<BrandType, string> = {
  google: 'logos:google-icon',
  facebook: 'simple-icons:facebook',
  x: 'simple-icons:x',
  github: 'simple-icons:github',
  apple: 'simple-icons:apple',
  slack: 'logos:slack-icon',
  figma: 'logos:figma',
}

export interface SocialButtonProps extends PrimitiveProps {
  brand: BrandType
  radius?: RadiusType
  /**
   * Control the size of the social button.
   * @defaultValue "2"
   */
  size?: '1' | '2' | '3' | '4'
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { extractClass } from '../util'

const props = withDefaults(defineProps<SocialButtonProps>(), {
  as: 'button',
  size: '2',
})

const resetClass = computed(() => {
  return extractClass(props, ['size', 'brand'])
})

const brandIcon = computed(() => {
  return BRAND_ICONS[props.brand]
})
</script>

<template>
  <Primitive
    class="ui-Button ui-SocialButton"
    :class="resetClass"
    :as-child="props.asChild"
    :as="props.as"
    :data-radius="props.radius"
    :data-disabled="props.disabled ? true : undefined"
  >
    <Icon v-if="brandIcon" :icon="brandIcon" />
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-SocialButton {
  background-color: var(--social-button-background-color);
  color: var(--social-button-text-color);
  box-shadow: 0px 1px 2px 0px #0A0D120D, 0px -2px 0px 0px #0A0D120D inset, 0px 0px 0px 1px #0A0D122E inset;
  --social-button-background-color: black;
  --social-button-text-color: white;
  --social-button-hover-filter: brightness(0.92) saturate(1.1);
}
@media (hover: hover) {
  .ui-SocialButton:where(:hover) {
    filter: var(--social-button-hover-filter);
  }
}
.ui-SocialButton:where(.r-brand-google) {
  background-color: var(--color-background);
  --social-button-text-color: var(--gray-12);
}
.ui-SocialButton:where(.r-brand-facebook) {
  --social-button-background-color: #1877F2;
}
.ui-SocialButton:where(.r-brand-github) {
  --social-button-background-color: #333;
}
.ui-SocialButton:where(.r-brand-slack) {
  --social-button-background-color: #611f69;
}
.ui-SocialButton:where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
.ui-SocialButton:where(:active) {
  box-shadow: var(--shadow-1);
}
.ui-SocialButton:where([data-disabled]) {
  color: var(--gray-a10);
  background-color: var(--gray-a2);
}
</style>
