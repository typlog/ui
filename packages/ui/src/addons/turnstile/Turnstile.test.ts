import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const removeTurnstileScripts = () => {
  document.head.querySelectorAll('script[src*="challenges.cloudflare.com/turnstile"]').forEach(script => script.remove())
}

let scripts: HTMLScriptElement[]

const loadComponent = async () => {
  vi.resetModules()
  const [{ mount }, { default: Turnstile }] = await Promise.all([
    import('@vue/test-utils'),
    import('./Turnstile.vue'),
  ])
  return { mount, Turnstile }
}

describe('Turnstile', () => {
  beforeEach(() => {
    scripts = []
    vi.spyOn(document.head, 'appendChild').mockImplementation((node: Node) => {
      if (node instanceof HTMLScriptElement) scripts.push(node)
      return node
    })
    delete window.turnstile
    delete window.cfTurnstileOnLoad
    removeTurnstileScripts()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('shares one loader while keeping widget operations independent', async () => {
    const { mount, Turnstile } = await loadComponent()
    let nextId = 0
    const render = vi.fn(() => nextId++)
    const reset = vi.fn()
    const remove = vi.fn()
    window.turnstile = { render, reset, remove }

    const first = mount(Turnstile, { props: { sitekey: 'one' } })
    const second = mount(Turnstile, { props: { sitekey: 'two' } })
    await Promise.resolve()

    expect(render).toHaveBeenCalledTimes(2)
    const firstId = render.mock.results[0]?.value
    const secondId = render.mock.results[1]?.value
    first.vm.reset()
    second.vm.remove()
    expect(reset).toHaveBeenCalledWith(firstId)
    expect(remove).toHaveBeenCalledWith(secondId)

    first.unmount()
  })

  it('renders concurrent mounts after one script load', async () => {
    const { mount, Turnstile } = await loadComponent()
    const render = vi.fn(() => 1)
    const api = { render, reset: vi.fn(), remove: vi.fn() }
    const first = mount(Turnstile, { props: { sitekey: 'one' } })
    const second = mount(Turnstile, { props: { sitekey: 'two' } })
    expect(scripts).toHaveLength(1)

    window.turnstile = api
    window.cfTurnstileOnLoad?.()
    await Promise.resolve()
    await Promise.resolve()

    expect(render).toHaveBeenCalledTimes(2)
    first.unmount()
    second.unmount()
  })

  it('does not render after unmount while loading', async () => {
    const { mount, Turnstile } = await loadComponent()
    const render = vi.fn()
    const wrapper = mount(Turnstile, { props: { sitekey: 'test' } })
    wrapper.unmount()
    window.turnstile = { render, reset: vi.fn(), remove: vi.fn() }
    window.cfTurnstileOnLoad?.()
    await Promise.resolve()
    await Promise.resolve()

    expect(render).not.toHaveBeenCalled()
  })

  it('allows a failed script load to be retried', async () => {
    const { mount, Turnstile } = await loadComponent()
    const first = mount(Turnstile, { props: { sitekey: 'test' } })
    const firstScript = scripts[0]
    firstScript?.dispatchEvent(new Event('error'))
    await Promise.resolve()
    await Promise.resolve()
    first.unmount()

    const render = vi.fn(() => 7)
    const second = mount(Turnstile, { props: { sitekey: 'test' } })
    expect(scripts).toHaveLength(2)
    window.turnstile = { render, reset: vi.fn(), remove: vi.fn() }
    window.cfTurnstileOnLoad?.()
    await Promise.resolve()
    await Promise.resolve()

    expect(render).toHaveBeenCalledOnce()
    second.unmount()
  })

  it('exposes manual render for deferred mounts', async () => {
    const { mount, Turnstile } = await loadComponent()
    const render = vi.fn(() => 3)
    window.turnstile = { render, reset: vi.fn(), remove: vi.fn() }
    const wrapper = mount(Turnstile, { props: { sitekey: 'test', renderOnMount: false } })
    await Promise.resolve()
    expect(render).not.toHaveBeenCalled()

    await wrapper.vm.render()
    expect(render).toHaveBeenCalledOnce()
    wrapper.unmount()
  })
})
