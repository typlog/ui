import { mount } from '@vue/test-utils'
import {
  createToastManager,
  ThemeProvider,
  ToastProvider,
} from '@typlog/ui'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'

describe('ToastProvider', () => {
  it('renders only messages from its assigned manager', () => {
    const first = createToastManager()
    const second = createToastManager()
    first.toast('First app')
    second.toast('Second app')

    const wrapper = mount(defineComponent({
      setup() {
        const item = (className: string) => ({ message }: { message: { title: string } }) => (
          h('span', { class: className }, message.title)
        )

        return () => h(ThemeProvider, null, {
          default: () => h('div', [
            h(ToastProvider, { manager: first }, { item: item('first-item') }),
            h(ToastProvider, { manager: second }, { item: item('second-item') }),
          ]),
        })
      },
    }))

    expect(wrapper.get('.first-item').text()).toBe('First app')
    expect(wrapper.get('.second-item').text()).toBe('Second app')
  })

  it('reacts when its manager prop changes', async () => {
    const first = createToastManager()
    const second = createToastManager()
    first.toast('First app')
    second.toast('Second app')

    const wrapper = mount(ToastProvider, {
      slots: {
        item: ({ message }: { message: { title: string } }) => (
          h('span', { class: 'toast-item' }, message.title)
        ),
      },
      global: {
        stubs: {
          ThemeWrapper: {
            template: '<div><slot /></div>',
          },
        },
      },
    })

    await wrapper.setProps({ manager: first })
    expect(wrapper.get('.toast-item').text()).toBe('First app')

    await wrapper.setProps({ manager: second })

    expect(wrapper.get('.toast-item').text()).toBe('Second app')
  })
})
