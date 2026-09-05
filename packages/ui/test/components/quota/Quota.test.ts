import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Quota } from '@typlog/ui'

describe('Quota', () => {
  it('uses the selected accent color for normal progress', () => {
    const wrapper = mount(Quota, {
      props: { percent: 40, color: 'jade' },
    })

    expect(wrapper.attributes('data-accent-color')).toBe('jade')
    expect(wrapper.get('.ui-QuotaValue').attributes('style'))
      .toContain('background-color: var(--accent-a6)')
  })

  it.each([
    { percent: -20, transform: 'translateX(-100%)' },
    { percent: 120, transform: 'translateX(0%)' },
  ])('clamps the $percent percent transform', ({ percent, transform }) => {
    const wrapper = mount(Quota, { props: { percent } })

    expect(wrapper.get('.ui-QuotaValue').attributes('style')).toContain(`transform: ${transform}`)
  })

  it('keeps the warning color when the quota is exceeded', () => {
    const wrapper = mount(Quota, {
      props: { percent: 120, color: 'jade' },
    })

    expect(wrapper.get('.ui-QuotaValue').attributes('style'))
      .toContain('background-color: var(--red-a10)')
  })
})
