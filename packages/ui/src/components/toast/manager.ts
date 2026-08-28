import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'
import type { ColorType, RadiusType } from '../types'

export type MessageCategory = 'success' | 'info' | 'warning' | 'error' | 'loading'


interface MessageAction {
  label: string
  altText?: string
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
  color?: ColorType
  radius?: RadiusType
  size?: '1' | '2' | '3' | '4'
  onClick: () => void
}

export interface ToastMessage {
  id: number
  category?: MessageCategory
  title: string
  height?: number
  type?: 'foreground' | 'background'
  duration?: number
  description?: string
  action?: MessageAction
}

export type Message = string | {
  title: string
  duration?: number
  type?: 'foreground' | 'background'
  description?: string
  action?: MessageAction
}

export type ToastFunction = {
  (message: Message): number
  info: (message: Message) => number
  success: (message: Message) => number
  warning: (message: Message) => number
  error: (message: Message) => number
  promise: <T>(fn: () => Promise<T>, options: PromiseMessageOption<T>) => number
}

interface PromiseMessageOption<T> {
  loading: string
  success: (data: T) => Message
  error?: (err: Error) => Message
}

let count = 0

export const useToastManager = createGlobalState(() => {
  const messages = ref<ToastMessage[]>([])

  const add = (msg: Message, category?: MessageCategory) => {
    const id = count++
    if (typeof msg === 'string') {
      messages.value.unshift({ title: msg, category, id })
    } else {
      messages.value.unshift({ ...msg, category, id })
    }
    return id
  }

  const update = (id: number, msg: Partial<ToastMessage>) => {
    const messageArray = [...messages.value]
    const index = messageArray.findIndex(item => item.id === id)
    if (index !== -1) {
      const found = messageArray[index]
      if (found) {
        messageArray[index] = {...found, ...msg}
        messages.value = messageArray
      }
    }
  }

  const remove = (id: number) => {
    const index = messages.value.findIndex(item => item.id === id)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }

  const info = (msg: Message) => {
    return add(msg, 'info')
  }

  const success = (msg: Message) => {
    return add(msg, 'success')
  }

  const warning = (msg: Message) => {
    return add(msg, 'warning')
  }

  const error = (msg: Message) => {
    return add(msg, 'error')
  }

  const promise = <T>(fn: () => Promise<T>, options: PromiseMessageOption<T>) => {
    // using 100min for promise duration
    const id = add({title: options.loading, duration: 6000000}, 'loading')

    fn().then((value) => {
      const msg = options.success(value)
      if (typeof msg === 'string') {
        update(id, {duration: undefined, title: msg, category: 'success'})
      } else {
        update(id, {duration: undefined, ...msg, category: 'success'})
      }
    }).catch((e) => {
      if (options.error) {
        const msg = options.error(e)
        if (typeof msg === 'string') {
          update(id, {duration: undefined, title: msg, category: 'error'})
        } else {
          update(id, {duration: undefined, ...msg, category: 'error'})
        }
      }
    })

    return id
  }

  return {
    messages,
    add,
    update,
    remove,
    info,
    success,
    warning,
    error,
    promise,
  }
})
