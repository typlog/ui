import { flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { createToastManager } from '@typlog/ui'
import { useToastManager } from '../../../src/components/toast/manager'

describe('toast manager', () => {
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

  it('keeps messages isolated between manager instances', () => {
    const first = createToastManager()
    const second = createToastManager()

    const firstId = first.toast.success('First app')
    const secondId = second.toast.error('Second app')

    expect(first.messages.value).toEqual([
      expect.objectContaining({ id: firstId, title: 'First app', category: 'success' }),
    ])
    expect(second.messages.value).toEqual([
      expect.objectContaining({ id: secondId, title: 'Second app', category: 'error' }),
    ])

    first.remove(firstId)
    expect(first.messages.value).toEqual([])
    expect(second.messages.value).toHaveLength(1)
  })

  it('keeps updates isolated when manager-local ids overlap', () => {
    const first = createToastManager()
    const second = createToastManager()
    const firstId = first.toast('First app')
    const secondId = second.toast('Second app')

    expect(firstId).toBe(secondId)

    first.update(firstId, { title: 'Updated first app' })
    expect(first.messages.value[0]?.title).toBe('Updated first app')
    expect(second.messages.value[0]?.title).toBe('Second app')
  })
})
