import { defineStore } from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => {
    return {
      page: 0,
      lastPage: false,
    }
  },
  getters: {
    getCurrentPage(): number {
      return this.page
    },
  },
  actions: {
    nextPage() {
      if (!this.lastPage) this.page++
    },
    lastPageReached() {
      this.lastPage = true
    },
    resetPages() {
      this.page = 0
      this.lastPage = false
    },
  },
})
