<template>
  <div
    v-if="isLoading && !pokemons.length"
    class="fixed inset-0 bg-primary-white bg-opacity-100 flex justify-center items-center w-full px-8 md:px-8 h-screen pt-8"
  >
    <Spinner>
      <img src="../assets/Loader.png" alt="loading-spinner" />
    </Spinner>
  </div>
  <div>
    <div class="flex justify-center w-full px-8 md:px-0 lg:px-0 mb-20">
      <div class="w-full md:w-2/5 lg:w-2/5">
        <SearchBar />
        <List />
      </div>
    </div>
    <Navbar></Navbar>
    <Modal v-if="showModal"></Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import List from '@/components/List.vue'
import Navbar from '@/components/Navbar.vue'
import SearchBar from '@/components/SearchBar.vue'
import Modal from '@/components/Modal.vue'
import { mapState } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
import Spinner from '@/components/Spinner.vue'

export default defineComponent({
  name: 'PokedexComponent',
  components: {
    List,
    Navbar,
    SearchBar,
    Modal,
    Spinner,
  },
  computed: {
    ...mapState(usePokemonStore, ['isLoading', 'pokemons']),
    showModal() {
      return this.$route.params.name
    },
  },
})
</script>
