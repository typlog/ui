/* eslint-disable vue/one-component-per-file -- test harnesses stay beside their assertions */
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@typlog/ui'

vi.mock('@iconify/vue', () => ({
  Icon: { template: '<svg aria-hidden="true" />' },
}))

interface MockMediaQuery extends MediaQueryList {
  dispatchMatches: (matches: boolean) => void
}

function installMatchMedia(initialMatches = false) {
  const queries: MockMediaQuery[] = []

  const matchMedia = vi.fn((media: string) => {
    const listeners = new Set<(event: MediaQueryListEvent) => void>()
    let matchesValue = initialMatches
    const query = {
      get matches() {
        return matchesValue
      },
      media,
      onchange: null,
      addEventListener: vi.fn((_type: string, listener: EventListenerOrEventListenerObject) => {
        listeners.add(listener as (event: MediaQueryListEvent) => void)
      }),
      removeEventListener: vi.fn((_type: string, listener: EventListenerOrEventListenerObject) => {
        listeners.delete(listener as (event: MediaQueryListEvent) => void)
      }),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      dispatchMatches(matches: boolean) {
        matchesValue = matches
        for (const listener of listeners)
          listener({ matches, media } as MediaQueryListEvent)
      },
    } as MockMediaQuery
    queries.push(query)
    return query
  })

  vi.stubGlobal('matchMedia', matchMedia)
  return { matchMedia, queries }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Sidebar', () => {
  it('replaces the media query listener when breakpoint changes and removes it on unmount', async () => {
    const { matchMedia, queries } = installMatchMedia()
    const wrapper = mount(SidebarProvider, {
      props: { breakpoint: 1024 },
      slots: { default: 'Content' },
    })

    expect(matchMedia).toHaveBeenCalledWith('(max-width: 1023.98px)')
    expect(queries[0].addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    await wrapper.setProps({ breakpoint: 768 })

    expect(queries[0].removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(matchMedia).toHaveBeenLastCalledWith('(max-width: 767.98px)')
    expect(queries[1].addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    wrapper.unmount()

    expect(queries[1].removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('tracks media query changes through the provider data contract', async () => {
    const { queries } = installMatchMedia()
    const wrapper = mount(SidebarProvider, {
      slots: { default: 'Content' },
    })

    expect(wrapper.attributes('data-mobile')).toBe('false')

    queries[0].dispatchMatches(true)
    await nextTick()

    expect(wrapper.attributes('data-mobile')).toBe('true')
  })

  it('updates uncontrolled desktop collapsed state through SidebarTrigger', async () => {
    installMatchMedia()
    const wrapper = mount(defineComponent({
      components: { Sidebar, SidebarProvider, SidebarTrigger },
      template: `
        <SidebarProvider>
          <Sidebar default-collapsed data-sidebar>Navigation</Sidebar>
          <SidebarTrigger data-trigger />
        </SidebarProvider>
      `,
    }))

    expect(wrapper.get('.ui-Sidebar').attributes('data-collapsed')).toBe('true')
    expect(wrapper.get('[data-trigger]').attributes('aria-expanded')).toBe('false')

    await wrapper.get('[data-trigger]').trigger('click')

    expect(wrapper.get('.ui-Sidebar').attributes('data-collapsed')).toBe('false')
    expect(wrapper.get('[data-trigger]').attributes('aria-expanded')).toBe('true')
  })

  it('emits a controlled collapsed update without mutating parent-owned state', async () => {
    installMatchMedia()
    const collapsed = ref(false)
    const updates = vi.fn()
    const wrapper = mount(defineComponent({
      components: { Sidebar, SidebarProvider, SidebarTrigger },
      setup: () => ({ collapsed, updates }),
      template: `
        <SidebarProvider>
          <Sidebar :collapsed="collapsed" @update:collapsed="updates" data-sidebar>Navigation</Sidebar>
          <SidebarTrigger data-trigger />
        </SidebarProvider>
      `,
    }))

    await wrapper.get('[data-trigger]').trigger('click')

    expect(updates).toHaveBeenCalledWith(true)
    expect(wrapper.get('.ui-Sidebar').attributes('data-collapsed')).toBe('false')
    expect(collapsed.value).toBe(false)
  })
})
