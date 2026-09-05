import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { FieldControl, FieldError, FieldRoot, FormRoot } from '@typlog/ui'

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>(resolvePromise => {
    resolve = resolvePromise
  })
  return { promise, resolve }
}

const Harness = defineComponent({
  components: { FieldControl, FieldError, FieldRoot, FormRoot },
  props: {
    validate: {
      type: Function,
      required: true,
    },
  },
  template: `
    <FormRoot>
      <FieldRoot name="email" :validate="validate">
        <FieldControl />
        <FieldError />
      </FieldRoot>
    </FormRoot>
  `,
})

describe('FieldRoot', () => {
  it('keeps synchronous validation behavior', async () => {
    const validate = vi.fn(() => 'Required field')
    const wrapper = mount(Harness, { props: { validate } })

    await wrapper.get('input').trigger('blur')
    await flushPromises()

    expect(wrapper.text()).toContain('Required field')
  })

  it('ignores an asynchronous validation result after new input', async () => {
    const pending = deferred<string | null>()
    const validate = vi.fn(() => pending.promise)
    const wrapper = mount(Harness, { props: { validate } })
    const input = wrapper.get('input')

    await input.trigger('blur')
    await input.setValue('new@example.com')
    pending.resolve('Stale error')
    await flushPromises()

    expect(validate).toHaveBeenCalledOnce()
    expect(wrapper.text()).not.toContain('Stale error')
  })

  it('does not submit when input changes during validation', async () => {
    const pending = deferred<string | null>()
    const wrapper = mount(Harness, {
      props: { validate: () => pending.promise },
    })
    const form = wrapper.findComponent(FormRoot)

    await form.get('form').trigger('submit')
    await wrapper.get('input').setValue('new@example.com')
    pending.resolve(null)
    await flushPromises()

    expect(form.emitted('submit')).toBeUndefined()
  })

  it('keeps the newest asynchronous validation result', async () => {
    const first = deferred<string | null>()
    const second = deferred<string | null>()
    const validate = vi.fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)
    const wrapper = mount(Harness, { props: { validate } })
    const input = wrapper.get('input')

    await input.trigger('blur')
    await input.setValue('new@example.com')
    await input.trigger('blur')
    second.resolve('Current error')
    await flushPromises()
    first.resolve('Stale error')
    await flushPromises()

    expect(wrapper.text()).toContain('Current error')
    expect(wrapper.text()).not.toContain('Stale error')
  })
})
