<template>
  <div class="bg-white fixed overflow-hidden bottom-0 w-full shadow-2xl py-2">
    <div class="flex flex-row justify-center">
      <div class="flex basis-5/6 md:basis-2/5 lg:basis-2/5">
        <Btn
          pill
          btn-title="All"
          :button-class="getFavoriteClasses('all')"
          :click-action="() => showAllPokemon()"
        >
          <template #iconLeft>
            <span class="text-xl mr-2">
              <i class="fa fa-list-ul" aria-hidden="true"></i>
            </span>
          </template>
        </Btn>
        <Btn
          pill
          btn-title="Favorites"
          :button-class="getFavoriteClasses('favorite')"
          :click-action="() => showFavoritePokemons()"
        >
          <template #iconLeft>
            <span class="text-xl">
              <i class="fa-solid fa-star"></i>
            </span>
          </template>
        </Btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Btn from './Btn.vue'
import { mapActions, mapState } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  name: 'NavbarComponent',
  props: {},
  components: {
    Btn,
  },
  data() {
    return {
      // Define your data properties here
    }
  },
  computed: {
    ...mapState(usePokemonStore, ['pokemonSelection']),
  },
  methods: {
    ...mapActions(usePokemonStore, ['showAllPokemon', 'showFavoritePokemons']),
    getFavoriteClasses(selection: string): string {
      return this.pokemonSelection === selection
        ? 'bg-primary-red hover:bg-dark-red'
        : 'bg-primary-grey hover:bg-dark-grey'
    },
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
