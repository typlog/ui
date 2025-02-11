<script lang="ts">
const turnstileSrc = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
const turnstileLoadFunction = 'cfTurnstileOnLoad'
let turnstileState = typeof window !== 'undefined' ? (window.turnstile !== undefined ? 'ready' : 'unloaded') : 'unloaded'
let turnstileLoad: {
  resolve: (value?: unknown) => void;
  reject: (value?: unknown) => void;
}
let widgetId: any
let resetTimeout: any

declare global {
  interface Window {
    turnstile: any;
    [turnstileLoadFunction]: any;
  }
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

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

const element = ref<HTMLDivElement>()

const resetTurnstile = () => {
  if (window.turnstile) {
    emit('update:modelValue', '')
    window.turnstile.reset()
  }
}

const removeTurnstile = () => {
  if (widgetId) {
    window.turnstile.remove(widgetId)
    widgetId = undefined
  }
}

const callbackTurnstile = (token: string) => {
  emit('update:modelValue', token)
  resetTimeout = setTimeout(() => {
    resetTurnstile()
  }, props.resetInterval)
}

const renderTurnstile = () => {
  widgetId = window.turnstile.render(element.value, {
    sitekey: props.sitekey,
    theme: props.theme,
    size: props.size,
    callback: callbackTurnstile,
    action: props.action,
    appearance: props.appearance,
  })
}

onMounted(async () => {
  const turnstileLoadPromise = new Promise((resolve, reject) => {
    turnstileLoad = { resolve, reject }
    if (turnstileState === 'ready') resolve(undefined)
  })

  window[turnstileLoadFunction] = () => {
    turnstileLoad.resolve()
    turnstileState = 'ready'
  }

  const ensureTurnstile = () => {
    if (turnstileState === 'unloaded') {
      turnstileState = 'loading'
      const url = `${turnstileSrc}?onload=${turnstileLoadFunction}&render=explicit`
      const script = document.createElement('script')
      script.src = url
      script.async = true
      script.addEventListener('error', () => {
        turnstileLoad.reject('Failed to load Turnstile.')
      })
      document.head.appendChild(script)
    }
    return turnstileLoadPromise
  }

  await ensureTurnstile()

  if (props.renderOnMount) {
    renderTurnstile()
  }
})

onBeforeUnmount(() => {
  removeTurnstile()
  clearTimeout(resetTimeout)
})
</script>

<template>
  <div ref="element"></div>
</template>
