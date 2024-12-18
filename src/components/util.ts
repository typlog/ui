import { type MaybeRefOrGetter, type ComputedRef, computed } from 'vue'
import { useEmitAsProps, useForwardProps } from 'radix-vue'

export function excludeProps<T extends Record<string, any>>(props: ComputedRef<T>, exclude: string[]) {
  return computed(() => {
    return _excludeProps(props.value, exclude)
  })
}

export function useForwardPropsEmits<T extends Record<string, any>, Name extends string>(
    props: MaybeRefOrGetter<T>,
    emit: (name: Name, ...args: any[]) => void,
    exclude: string[],
) {
  const parsedProps = useForwardProps(props)
  const emitsAsProps = useEmitAsProps(emit)
  return computed(() => ({
    ..._excludeProps(parsedProps.value, exclude),
    ...emitsAsProps,
  }))
}

export function extractForwardProps<T extends Record<string, any>>(
  props: MaybeRefOrGetter<T>,
  keys: string[],
) {
  const parsedProps = useForwardProps(props)
  const fowarded = computed(() => _excludeProps(parsedProps.value, keys))
  const classes = computed(() => {
    return extractClass(parsedProps.value, keys)
  })
  return [fowarded, classes] as [ComputedRef<{[x: string]: any}>, ComputedRef<string[]>]
}

export function extractForwardPropsEmits<T extends Record<string, any>, Name extends string>(
  props: MaybeRefOrGetter<T>,
  emit: (name: Name, ...args: any[]) => void,
  keys: string[],
) {
  const parsedProps = useForwardProps(props)
  const emitsAsProps = useEmitAsProps(emit)
  const fowarded = computed(() => ({
    ..._excludeProps(parsedProps.value, keys),
    ...emitsAsProps,
  }))
  const classes = computed(() => {
    return extractClass(parsedProps.value, keys)
  })
  return [fowarded, classes] as [ComputedRef<{[x: string]: any}>, ComputedRef<string[]>]
}

function _excludeProps (props: Record<string, any>, exclude: string[]) {
  const rv: Record<string, any> = {}
  Object.keys(props).forEach(k => {
    if (exclude.indexOf(k) === -1) {
      rv[k] = props[k]
    }
  })
  return rv
}

export const extractClass = (props: Record<string, any>, keys: string[]) => {
  const rv: string[] = []
  keys.forEach(key => {
    // color and radius will use dataset attributes
    if (key !== 'color' && key !== 'radius') {
      const value = props[key]
      // boolean
      if (value === true) {
        rv.push(`r-${kebabize(key)}`)
      } else if (value) {
        rv.push(`r-${kebabize(key)}-${value}`)
      }
    }
  })
  return rv
}

function kebabize (str: string) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, _kebabReplace)
}

function _kebabReplace (str: string, ofs: boolean) {
  return (ofs ? '-' : '') + str.toLowerCase()
}
