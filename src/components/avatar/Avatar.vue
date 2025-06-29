<script lang="ts">
import type { ColorType, RadiusType } from '../types'

export interface AvatarProps {
  /** Alt text of the avatar. */
  alt: string
  /** Avatar's image source URL. */
  src?: string
  /** Using fallback characters for the avatar. */
  fallback?: string
  /**
   * Overrides the radius inherited from the theme.
   * @defaultValue "small"
   */
  radius?: RadiusType
  /**
   * The visual variant to apply.
   * @defaultValue "solid"
   */
  variant?: 'solid' | 'soft' | 'ring'
  /**
   * Control the size of the avatar.
   * @defaultValue "2"
   */
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  /** Overrides the accent color inherited from the Theme. */
  color?: ColorType
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
} from 'reka-ui'
import { extractClass } from '../util'

const props = withDefaults(defineProps<AvatarProps>(), {
  radius: 'small',
  variant: 'solid',
  size: '2',
})
const resetClass = computed(() => {
  return extractClass(props, ['size', 'variant'])
})
const fallback = computed(() => {
  if (props.fallback) {
    return props.fallback
  }
  const symbols = props.alt.split(/\s+/).map(p => p[0])
  if (props.size === '1') {
    return symbols[0]
  } else {
    return symbols.slice(0, 2).join('')
  }
})
</script>

<template>
  <AvatarRoot
    class="ui-Avatar"
    :class="resetClass"
    :data-accent-color="props.color"
    :data-radius="props.radius"
  >
    <AvatarImage
      :alt="props.alt"
      :src="props.src || ''"
    />
    <AvatarFallback :class="`r-count-${fallback.length}`">{{ fallback }}</AvatarFallback>
  </AvatarRoot>
</template>

<style>
.ui-Avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  user-select: none;
  width: var(--avatar-size);
  height: var(--avatar-size);
  flex-shrink: 0;
}

.ui-Avatar > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.ui-Avatar > span {
  font-family: var(--default-font-family);
  font-weight: var(--font-weight-medium);
  font-style: normal;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border-radius: inherit;
  text-transform: uppercase;
}

.ui-Avatar > span.r-count-1 {
  font-size: var(--avatar-fallback-one-letter-font-size);
}

.ui-Avatar > span.r-count-2 {
  font-size: var(--avatar-fallback-two-letters-font-size, var(--avatar-fallback-one-letter-font-size));
}

.ui-Avatar:where(.r-size-1) {
  --avatar-size: var(--space-5);
  --avatar-fallback-one-letter-font-size: var(--font-size-2);
  --avatar-fallback-two-letters-font-size: var(--font-size-1);
  --avatar-ring-width: 1px;
  --avatar-ring-offset: 1px;
  border-radius: max(var(--radius-2), var(--radius-full));
  letter-spacing: var(--letter-spacing-1);
}
.ui-Avatar:where(.r-size-2) {
  --avatar-size: var(--space-6);
  --avatar-fallback-one-letter-font-size: var(--font-size-3);
  --avatar-fallback-two-letters-font-size: var(--font-size-2);
  --avatar-ring-width: 2px;
  --avatar-ring-offset: 2px;
  border-radius: max(var(--radius-2), var(--radius-full));
  letter-spacing: var(--letter-spacing-2);
}

.ui-Avatar:where(.r-size-3) {
  --avatar-size: var(--space-7);
  --avatar-fallback-one-letter-font-size: var(--font-size-4);
  --avatar-fallback-two-letters-font-size: var(--font-size-3);
  --avatar-ring-width: 2px;
  --avatar-ring-offset: 2px;
  border-radius: max(var(--radius-3), var(--radius-full));
  letter-spacing: var(--letter-spacing-3);
}

.ui-Avatar:where(.r-size-4) {
  --avatar-size: var(--space-8);
  --avatar-fallback-one-letter-font-size: var(--font-size-5);
  --avatar-fallback-two-letters-font-size: var(--font-size-4);
  --avatar-ring-width: 2px;
  --avatar-ring-offset: 2px;
  border-radius: max(var(--radius-3), var(--radius-full));
  letter-spacing: var(--letter-spacing-4);
}

.ui-Avatar:where(.r-size-5) {
  --avatar-size: var(--space-9);
  --avatar-fallback-one-letter-font-size: var(--font-size-6);
  --avatar-ring-width: 3px;
  --avatar-ring-offset: 2px;
  border-radius: max(var(--radius-4), var(--radius-full));
  letter-spacing: var(--letter-spacing-6);
}

.ui-Avatar:where(.r-size-6) {
  --avatar-size: 80px;
  --avatar-fallback-one-letter-font-size: var(--font-size-7);
  --avatar-ring-width: 3px;
  --avatar-ring-offset: 3px;
  border-radius: max(var(--radius-5), var(--radius-full));
  letter-spacing: var(--letter-spacing-7);
}

.ui-Avatar:where(.r-size-7) {
  --avatar-size: 96px;
  --avatar-fallback-one-letter-font-size: var(--font-size-7);
  --avatar-ring-width: 3px;
  --avatar-ring-offset: 3px;
  border-radius: max(var(--radius-5), var(--radius-full));
  letter-spacing: var(--letter-spacing-7);
}

.ui-Avatar:where(.r-size-8) {
  --avatar-size: 128px;
  --avatar-fallback-one-letter-font-size: var(--font-size-8);
  --avatar-ring-width: 4px;
  --avatar-ring-offset: 3px;
  border-radius: max(var(--radius-6), var(--radius-full));
  letter-spacing: var(--letter-spacing-8);
}

.ui-Avatar:where(.r-size-9) {
  --avatar-size: 160px;
  --avatar-fallback-one-letter-font-size: var(--font-size-9);
  --avatar-ring-width: 4px;
  --avatar-ring-offset: 4px;
  border-radius: max(var(--radius-6), var(--radius-full));
  letter-spacing: var(--letter-spacing-9);
}

.ui-Avatar:where(.r-variant-ring) {
  outline-color: var(--accent-9);
  outline-width: var(--avatar-ring-width);
  outline-offset: var(--avatar-ring-offset);
  outline-style: solid;
}

.ui-Avatar:where(.r-variant-ring) > span,
.ui-Avatar:where(.r-variant-solid) > span {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
.ui-Avatar:where(.r-variant-soft) > span {
  background-color: var(--accent-a3);
  color: var(--accent-a11);
}
</style>
