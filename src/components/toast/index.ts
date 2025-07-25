import {
  useToastManager,
  type ToastFunction,
  type Message,
} from './manager'

export type {
  Message,
  ToastMessage,
} from './manager'

export {
  default as ToastProvider,
  type ToastProviderProps,
} from './ToastProvider.vue'

export const toastManager = useToastManager()


export const toast: ToastFunction = Object.assign(
  (msg: Message) => {
    return toastManager.add(msg)
  },
  {
    info: toastManager.info,
    success: toastManager.success,
    warning: toastManager.warning,
    error: toastManager.error,
    promise: toastManager.promise,
  },
)
