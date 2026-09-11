import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { Callout } from '@typlog/ui'

vi.mock('@iconify/vue', () => ({
  Icon: {
    props: ['icon'],
    template: '<svg aria-hidden="true" :data-icon="icon" />',
  },
}))

const Harness = defineComponent({
  components: { Callout },
  template: `
    <Callout
      color="amber"
      icon="lucide:triangle-alert"
      role="status"
      title="Scheduled maintenance"
    >
      Starts at 18:00.
    </Callout>
  `,
})

describe('Callout', () => {
  it('renders the default visual contract and forwards landmark attributes', () => {
    const wrapper = mount(Harness)
    const callout = wrapper.get('.ui-Callout')

    expect(callout.classes()).toContain('r-size-2')
    expect(callout.classes()).toContain('r-variant-soft')
    expect(callout.attributes('data-accent-color')).toBe('amber')
    expect(callout.attributes('role')).toBe('status')
  })

  it('renders structured icon, title, and message content', () => {
    const wrapper = mount(Harness)

    expect(wrapper.get('.ui-CalloutIcon').attributes('aria-hidden')).toBe('true')
    expect(wrapper.get('.ui-CalloutIcon svg').attributes('data-icon')).toBe('lucide:triangle-alert')
    expect(wrapper.get('.ui-CalloutTitle').text()).toBe('Scheduled maintenance')
    expect(wrapper.get('.ui-CalloutText').text()).toBe('Starts at 18:00.')
  })

  it.each(['soft', 'surface', 'outline'] as const)('applies the %s variant', (variant) => {
    const wrapper = mount(Callout, {
      props: { variant },
      slots: { default: 'Message' },
    })

    expect(wrapper.classes()).toContain(`r-variant-${variant}`)
    expect(wrapper.classes()).not.toContain('r-variant-solid')
  })

  it('applies explicit size and contrast props', () => {
    const wrapper = mount(Callout, {
      props: { size: '3', highContrast: true },
      slots: { default: 'Message' },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['r-size-3', 'r-high-contrast']))
  })

  it('lets named slots replace the structured props', () => {
    const wrapper = mount(Callout, {
      props: { icon: 'lucide:info', title: 'Default title' },
      slots: {
        icon: '<svg data-custom-icon />',
        title: 'Custom title',
        default: 'Message',
      },
    })

    expect(wrapper.find('[data-icon]').exists()).toBe(false)
    expect(wrapper.find('[data-custom-icon]').exists()).toBe(true)
    expect(wrapper.get('.ui-CalloutTitle').text()).toBe('Custom title')
  })
})
