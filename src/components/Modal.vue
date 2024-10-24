<template>
  <div
    v-if="isLoading"
    class="inset-0 fixed bg-primary-white bg-opacity-100 flex justify-center items-center w-full px-8 md:px-8 h-screen pt-8"
  >
    <Spinner>
      <img src="../assets/Loader.png" alt="loading-spinner" />
    </Spinner>
  </div>
  <div
    v-else
    class="fixed inset-0 bg-primary-black bg-opacity-80 flex justify-center items-center w-full px-8 md:px-8 h-screen pt-8"
  >
    <!-- Card -->
    <div
      class="modal-card relative bg-white rounded-lg shadow-lg max-w-xs md:max-w-lg lg:max-w-2xl w-full h-2/3 lg:h-3/4"
    >
      <!-- Background with Pokémon Image -->
      <div class="bg-section relative h-1/2 md:h-2/5 lg:h-1/2">
        <!-- Background Image -->
        <div class="bg-pokemon h-full bg-cover bg-center rounded-t-lg"></div>

        <!-- Pokémon Image -->
        <img
          :src="pokemonDetails.image.front_default"
          alt="pokemon-img"
          class="pokemon-img absolute inset-x-0 bottom-10 mx-auto object-cover w-40 h-40 md:w-32 md:h-32 lg:h-40 lg:w-40"
        />
      </div>

      <!-- Content Section -->
      <div class="p-6 flex flex-col divide-y">
        <p class="py-2 text-dark-grey font-bold">
          Name:
          <span class="font-normal capitalize">
            {{ pokemonDetails.name }}
          </span>
        </p>
        <p class="py-2 text-dark-grey font-bold">
          Weight:
          <span class="font-normal">
            {{ pokemonDetails.weight }}
          </span>
        </p>
        <p class="py-2 text-dark-grey font-bold">
          Height:
          <span class="font-normal">
            {{ pokemonDetails.height }}
          </span>
        </p>
        <p class="py-2 text-dark-grey font-bold">
          Types:
          <span class="font-normal capitalize">
            {{ pokemonTypes }}
          </span>
        </p>

        <div class="pt-4 lg:pt-2 flex justify-between w-full">
          <div class="w-2/3 lg:w-1/3">
            <!-- Share Button -->
            <Btn
              pill
              btn-title="Share to my friends"
              button-class="bg-primary-red hover:bg-dark-red"
              :click-action="() => handleShare()"
            ></Btn>
          </div>
          <div>
            <!-- Favorite Button -->
            <Btn
              rounded
              button-class="bg-secondary-grey hover:bg-primary-grey"
              :click-action="handleFavorite"
            >
              <span :class="['text-xl', favoriteIconClasses]">
                <i class="fa-solid fa-star"></i>
              </span>
            </Btn>
          </div>
        </div>
      </div>

      <!-- Close Button -->
      <Btn rounded :click-action="() => closeModal()">
        <span
          :class="[
            'text-2xl text-primary-white group-hover:text-primary-red absolute top-2 right-4',
          ]"
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </span>
      </Btn>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { usePokemonStore } from '@/stores/pokemon'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import Btn from './Btn.vue'
import Spinner from './Spinner.vue'

export default defineComponent({
  name: 'ModalComponent',
  props: {},
  components: {
    Btn,
    Spinner,
  },
  data() {
    return {
      name: this.$route.params.name as string,
    }
  },
  async created() {
    this.startLoading()
    await this.getPokemonDetails(this.name)
    this.resetAPiCallSuccess()
    this.stopLoading()
  },
  computed: {
    ...mapState(usePokemonStore, ['pokemonDetails', 'isLoading']),
    pokemonTypes() {
      return this.pokemonDetails.types
        .map(pokemonType => pokemonType.name)
        .join(', ')
    },
    favoriteIconClasses() {
      return this.pokemonDetails.favorite
        ? 'text-primary-yellow group-hover:text-yellow-400'
        : 'group-hover:text-dark-grey text-primary-grey'
    },
  },
  methods: {
    ...mapActions(usePokemonStore, [
      'getPokemonDetails',
      'startLoading',
      'stopLoading',
      'resetAPiCallSuccess',
      'toggleFavorite',
    ]),
    closeModal() {
      document.body.classList.remove('modal-open')
      router.push({ name: 'pokedex' })
    },
    handleFavorite() {
      this.pokemonDetails.favorite = !this.pokemonDetails.favorite
      return this.toggleFavorite({
        name: this.pokemonDetails.name,
        id: this.pokemonDetails.id,
        favorite: this.pokemonDetails.favorite,
      })
    },
    handleShare() {
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(`Check out this cool ${this.pokemonDetails.name.charAt(0).toUpperCase() + this.pokemonDetails.name.slice(1)}:`)}`
      window.open(twitterUrl, '_blank')
    },
  },
})
</script>

<style scoped>
.bg-pokemon {
  background-image: url(../assets/Pokemon_bg.png);
}
/* .pokemon-img {
  height: 10rem;
  width: 10rem;
} */
@media (max-width: 380px) {
  .bg-section {
    height: 40%;
  }
  .pokemon-img {
    height: 9rem;
    width: 9rem;
    bottom: 1rem;
  }
}
</style>
