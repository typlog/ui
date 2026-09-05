import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { SavingIndicator } from '@typlog/ui'

describe('SavingIndicator', () => {
  it('renders the element selected by the as prop', () => {
    const wrapper = mount(SavingIndicator, {
      props: { status: 'idle', as: 'strong' },
    })

    expect(wrapper.element.tagName).toBe('STRONG')
  })
})
