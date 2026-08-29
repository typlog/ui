import { flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { useToastManager } from './manager'

describe('toast promise manager', () => {
  const manager = useToastManager()

  beforeEach(() => {
    manager.messages.value.splice(0)
  })

  it('updates the loading toast to success', async () => {
    const id = manager.promise(
      () => Promise.resolve('done'),
      { loading: 'Working', success: value => `Finished: ${value}` },
    )
    expect(manager.messages.value).toEqual([
      expect.objectContaining({ id, title: 'Working', category: 'loading' }),
    ])

    await flushPromises()
    expect(manager.messages.value).toEqual([
      expect.objectContaining({ id, title: 'Finished: done', category: 'success', duration: undefined }),
    ])
  })

  it('uses a custom error formatter for rejected promises', async () => {
    const id = manager.promise(
      () => Promise.reject(new Error('secret')),
      { loading: 'Working', success: () => 'Done', error: () => ({ title: 'Try again' }) },
    )

    await flushPromises()
    expect(manager.messages.value).toEqual([
      expect.objectContaining({ id, title: 'Try again', category: 'error', duration: undefined }),
    ])
  })

  it('removes the loading toast when no error formatter is provided', async () => {
    const id = manager.promise(
      () => Promise.reject(new Error('secret')),
      { loading: 'Working', success: () => 'Done' },
    )

    await flushPromises()
    expect(manager.messages.value.find(message => message.id === id)).toBeUndefined()
    expect(manager.messages.value.some(message => message.title === 'secret')).toBe(false)
  })
})
