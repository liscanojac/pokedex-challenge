<template>
  <form @submit.prevent="search" class="my-8">
    <div class="group relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-primary-grey group-focus-within:text-dark-grey"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search"
        v-model="searchInput"
        class="block w-full p-4 ps-10 border-none focus:outline-none rounded-md shadow-md focus:shadow-xl focus:placeholder-dark-grey"
      />
    </div>
  </form>
</template>

<script lang="ts">
import router from '@/router'
import { usePokemonStore } from '@/stores/pokemon'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchBarComponent',
  data() {
    return {
      searchInput: '',
    }
  },
  computed: {
    ...mapState(usePokemonStore, ['apiCallSuccess']),
  },
  methods: {
    ...mapActions(usePokemonStore, [
      'searchPokemon',
      'startLoading',
      'stopLoading',
    ]),
    async search() {
      if (this.searchInput) {
        this.startLoading()
        await this.searchPokemon(this.searchInput.toLowerCase())
        this.searchInput = ''
        this.stopLoading()
        if (!this.apiCallSuccess) router.push({ path: '/lost' })
        if (this.apiCallSuccess && this.$route.path === '/lost')
          router.push({ path: '/pokedex' })
      }
    },
  },
})
</script>
