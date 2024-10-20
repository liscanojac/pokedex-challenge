import { defineStore } from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => {
    return {
      page: 0,
      lastPageReached: false,
    }
  },
  getters: {
    getCurrentPage(): number {
      return this.page
    },
  },
  actions: {
    nextPage() {
      if (!this.lastPageReached) this.page++
    },
    setLastPageReached() {
      this.lastPageReached = true
    },
  },
})
