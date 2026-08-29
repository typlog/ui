<script lang="ts">
const turnstileSrc = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
const turnstileLoadFunction = 'cfTurnstileOnLoad'

type TurnstileWidgetId = string | number

interface TurnstileRenderOptions {
  sitekey: string
  theme: 'light' | 'dark' | 'auto'
  size: 'normal' | 'compact'
  callback: (token: string) => void
  action: string
  appearance: 'always' | 'execute' | 'interaction-only'
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => TurnstileWidgetId
  reset: (widgetId?: TurnstileWidgetId) => void
  remove: (widgetId: TurnstileWidgetId) => void
}

let turnstileLoadPromise: Promise<void> | undefined

declare global {
  interface Window {
    turnstile?: TurnstileApi
    cfTurnstileOnLoad?: () => void
  }
}

const loadTurnstile = (): Promise<void> => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Turnstile is only available in a browser.'))
  }

  if (window.turnstile) {
    return Promise.resolve()
  }

  if (turnstileLoadPromise) {
    return turnstileLoadPromise
  }

  turnstileLoadPromise = new Promise<void>((resolve, reject) => {
    const onLoad = () => {
      if (window.turnstile) {
        resolve()
      } else {
        reject(new Error('Turnstile loaded without exposing its API.'))
      }
    }

    window[turnstileLoadFunction] = onLoad
    const script = document.createElement('script')
    script.src = `${turnstileSrc}?onload=${turnstileLoadFunction}&render=explicit`
    script.async = true
    script.addEventListener('error', () => {
      reject(new Error('Failed to load Turnstile.'))
    }, { once: true })
    document.head.appendChild(script)
  }).catch((error: unknown) => {
    turnstileLoadPromise = undefined
    if (window.cfTurnstileOnLoad) {
      delete window.cfTurnstileOnLoad
    }
    throw error
  })

  return turnstileLoadPromise
}

export interface TurnstileProps {
  sitekey: string
  modelValue?: string
  resetInterval?: number
  size?: 'normal' | 'compact'
  theme?: 'light' | 'dark' | 'auto'
  action?: string
  appearance?: 'always' | 'execute' | 'interaction-only'
  renderOnMount?: boolean
}
</script>

<script setup lang="ts">
import { useTemplateRef, onMounted, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(defineProps<TurnstileProps>(), {
  resetInterval: 295 * 1000,
  size: 'normal',
  theme: 'auto',
  action: '',
  appearance: 'always',
  renderOnMount: true,
})

const emit = defineEmits<{
  'update:modelValue': [string]
}>()

const element = useTemplateRef<HTMLDivElement>('element')
const mounted = ref(false)
let widgetId: TurnstileWidgetId | undefined
let resetTimeout: ReturnType<typeof setTimeout> | undefined

const clearResetTimeout = () => {
  if (resetTimeout !== undefined) {
    clearTimeout(resetTimeout)
    resetTimeout = undefined
  }
}

const resetTurnstile = () => {
  if (widgetId !== undefined && window.turnstile) {
    clearResetTimeout()
    emit('update:modelValue', '')
    window.turnstile.reset(widgetId)
  }
}

const removeTurnstile = () => {
  clearResetTimeout()
  if (widgetId !== undefined) {
    if (window.turnstile) {
      window.turnstile.remove(widgetId)
    }
    widgetId = undefined
  }
}

const callbackTurnstile = (token: string) => {
  emit('update:modelValue', token)
  clearResetTimeout()
  resetTimeout = setTimeout(() => {
    resetTurnstile()
  }, props.resetInterval)
}

const renderTurnstile = async () => {
  if (!mounted.value || widgetId !== undefined || !element.value) return

  if (!window.turnstile) {
    try {
      await loadTurnstile()
    } catch {
      return
    }
  }

  if (!mounted.value || widgetId !== undefined || !element.value || !window.turnstile) return

  widgetId = window.turnstile.render(element.value, {
    sitekey: props.sitekey,
    theme: props.theme,
    size: props.size,
    callback: callbackTurnstile,
    action: props.action,
    appearance: props.appearance,
  })
}

defineExpose({
  render: renderTurnstile,
  reset: resetTurnstile,
  remove: removeTurnstile,
})

onMounted(() => {
  mounted.value = true
  if (props.renderOnMount) {
    void renderTurnstile()
  }
})

onBeforeUnmount(() => {
  mounted.value = false
  removeTurnstile()
})
</script>

<template>
  <div ref="element" class="ui-Turnstile" :class="`r-size-${size}`"></div>
</template>

<style>
@layer components {
  .ui-Turnstile {
    background: var(--gray-a3);
  }
  .ui-Turnstile:where(.r-size-normal) {
    width: 300px;
    height: 65px;
  }
  .ui-Turnstile:where(.r-size-compact) {
    width: 150px;
    height: 140px;
  }
}
</style>
