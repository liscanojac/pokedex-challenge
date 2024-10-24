import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PokedexView from '@/views/PokedexView.vue'
import LostView from '@/views/LostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexView,
    },
    {
      path: '/pokedex/:name',
      name: 'details',
      component: PokedexView,
    },
    {
      path: '/lost',
      name: 'lost',
      component: LostView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: LostView,
    },
  ],
})

export default router
