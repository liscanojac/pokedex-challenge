<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <div
      class="container scale-75 md:scale-90 lg:scale-100 relative flex justify-center items-center"
    >
      <div class="pokemon-logo w-60 h-60 bg-primary-red rounded-full relative">
        <div
          class="content-1 absolute w-full h-full rounded-full overflow-hidden z-10"
        >
          <img
            src="../assets/Pickachu_Home.png"
            class="absolute"
            alt="home_logo"
          />
        </div>
        <div
          class="content-2 absolute w-full h-full rounded-full border-solid border-2 border-primary-black"
        >
          <img
            src="../assets/Pickachu_Home.png"
            class="absolute"
            alt="home_logo"
          />
        </div>
      </div>
    </div>
    <div class="w-3/4 md:w-1/2 lg:w-2/5 z-20">
      <Message
        :title="homeTitle"
        title-classes="text-2xl"
        :msg="homeMessage"
        msg-classes="text-lg my-4"
      ></Message>
    </div>
    <div class="w-2/5 md:w-1/4 lg:w-1/4">
      <Btn
        pill
        :btn-title="btnMsg"
        button-class="bg-primary-red md:hover:bg-dark-red lg:hover:bg-dark-red py-2 mt-6"
        :click-action="() => goToPokedex()"
      ></Btn>
    </div>
  </div>
</template>

<script lang="ts">
import Btn from '@/components/Btn.vue'
import Message from '@/components/Message.vue'
import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeViewComponent',
  components: {
    Btn,
    Message,
  },
  data() {
    return {
      homeTitle: 'Welcome to Pokédex',
      homeMessage:
        'The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.',
      btnMsg: 'Get Started',
    }
  },
  methods: {
    goToPokedex() {
      router.push({ name: 'pokedex' })
    },
  },
})
</script>

<style scoped>
.content-1 {
  box-shadow: -40px 50px var(--primary-white);
}

img {
  height: 400px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
