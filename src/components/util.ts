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

function _excludeProps (props: Record<string, any>, exclude: string[]) {
  const rv: Record<string, any> = {}
  Object.keys(props).forEach(k => {
    if (exclude.indexOf(k) === -1) {
      rv[k] = props[k]
    }
  })
  return rv
}
