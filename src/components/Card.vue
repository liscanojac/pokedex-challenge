<template>
  <div
    class="flex justify-between items-center bg-white my-2 rounded-md px-1 py-0.5 cursor-pointer"
    @click.self="goToPokemonDetails"
  >
    <h2
      class="capitalize ml-3 font-medium cursor-pointer"
      @click="goToPokemonDetails"
    >
      {{ pokemon.name }}
    </h2>
    <Btn
      rounded
      :clickAction="() => toggleFavorite(pokemon)"
      buttonClass="bg-secondary-grey hover:bg-primary-grey"
    >
      <span :class="['text-xl', iconClasses]">
        <i class="fa-solid fa-star"></i>
      </span>
    </Btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { PokemonBase } from '@/interfaces/pokemon'
import Btn from './Btn.vue'
import { mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
import router from '@/router'

export default defineComponent({
  name: 'YourComponent',
  components: {
    Btn,
  },
  props: {
    pokemon: {
      type: Object as PropType<PokemonBase>,
      required: true,
    },
  },
  computed: {
    iconClasses() {
      return this.pokemon.favorite
        ? 'text-primary-yellow group-hover:text-yellow-400'
        : 'group-hover:text-dark-grey text-primary-grey'
    },
  },
  methods: {
    ...mapActions(usePokemonStore, ['toggleFavorite']),
    goToPokemonDetails() {
      document.body.classList.add('modal-open')
      router.push({ name: 'details', params: { name: this.pokemon.name } })
    },
  },
})
</script>
