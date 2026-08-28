import type { Component } from 'vue'
import { h, render } from 'vue'
import type { ChartConfig } from './types'

/** Creates a synchronous Unovis template callback from a Vue tooltip component. */
export function createChartTooltipTemplate (
  config: ChartConfig,
  component: Component,
  props: Record<string, unknown> = {},
) {
  return (rawPayload: unknown, x?: string | number | Date) => {
    if (typeof document === 'undefined')
      return ''

    const payload = unwrapPayload(rawPayload, config)
    const container = document.createElement('div')
    const vnode = h(component, { ...props, payload, config, x })
    render(vnode, container)
    const html = container.innerHTML
    render(null, container)
    return html
  }
}

function unwrapPayload (payload: unknown, config: ChartConfig): Record<string, unknown> {
  if (isRecord(payload) && isRecord(payload.data))
    return unwrapPayload(payload.data, config)
  if (!isRecord(payload))
    return {}

  const configured = Object.keys(config).filter(key => key in payload)
  if (configured.length)
    return Object.fromEntries(configured.map(key => [key, payload[key]]))
  return payload
}

function isRecord (value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
