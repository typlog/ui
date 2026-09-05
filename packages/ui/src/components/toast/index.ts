import {
  useToastManager,
} from './manager'

export type {
  Message,
  ToastFunction,
  ToastManager,
  ToastMessage,
} from './manager'

export {
  createToastManager,
} from './manager'

export {
  default as ToastProvider,
  type ToastProviderProps,
} from './ToastProvider.vue'

const toastManager = useToastManager()

export const toast = toastManager.toast
