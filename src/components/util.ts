import { type MaybeRefOrGetter, computed } from 'vue'
import { useEmitAsProps, useForwardProps } from 'reka-ui'


export function useForwardPropsWithout<T extends Record<string, any>>(
  props: MaybeRefOrGetter<T>,
  exclude: string[],
) {
  const parsedProps = useForwardProps(props)
  return computed(() => ({
    ..._excludeProps(parsedProps.value, exclude),
  }))
}

export function useForwardPropsEmitsWithout<T extends Record<string, any>, Name extends string>(
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

export const buildPropsClass = (props: Record<string, any>, keys: string[]) => {
  return computed(() => {
    const rv: string[] = []
    keys.forEach(key => {
      const value = props[key]
      if (key === 'class') {
        rv.push(value)
      }

      // boolean
      if (value === true) {
        rv.push(`r-${kebabize(key)}`)
      } else if (value) {
        rv.push(`r-${kebabize(key)}-${value}`)
      }
    })
    return rv
  })
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

function kebabize (str: string) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, _kebabReplace)
}

function _kebabReplace (str: string, ofs: boolean) {
  return (ofs ? '-' : '') + str.toLowerCase()
}
