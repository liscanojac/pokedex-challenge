import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePagesStore } from '../pages'

describe('Pages Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Initial state', () => {
    const pages = usePagesStore()
    expect(pages.getCurrentPage).toBe(0)
  })
  it('nextPage action', () => {
    const pages = usePagesStore()
    pages.nextPage()
    expect(pages.getCurrentPage).toBe(1)
  })
  it('lastPageReached action', () => {
    const pages = usePagesStore()
    pages.lastPageReached()
    expect(pages.lastPage).toBe(true)
  })
})
