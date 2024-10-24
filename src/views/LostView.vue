<template>
  <div class="flex justify-center w-full px-8 md:px-0 lg:px-0">
    <div class="w-full md:w-2/5 lg:w-2/5">
      <SearchBar />
      <div class="mt-16 flex flex-col justify-center items-center">
        <Message :title="lostTitle" :msg="lostMsg"> </Message>
        <Btn
          pill
          :btn-title="btnMsg"
          button-class="bg-primary-red md:hover:bg-dark-red lg:hover:bg-dark-red w-3/5 md:w-1/4 lg:w-1/4 py-2 mt-5"
          :click-action="() => goHome()"
        ></Btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Btn from '@/components/Btn.vue'
import Message from '@/components/Message.vue'
import SearchBar from '@/components/SearchBar.vue'
import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LostViewComponent',
  props: {},
  components: {
    SearchBar,
    Message,
    Btn,
  },
  data() {
    return {
      lostTitle: 'Uh-oh!',
      lostMsg: 'You look lost on your journey!',
      btnMsg: 'Go back home',
    }
  },
  methods: {
    goHome() {
      router.push({ path: '/' })
    },
  },
})
</script>
