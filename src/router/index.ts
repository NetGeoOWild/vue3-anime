import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AnimeView from '@/views/AnimeView.vue'
import AnimeFavorites from '@/views/AnimeFavorites.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/anime/:id',
      name: 'anime',
      component: AnimeView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: AnimeFavorites,
    },
  ],
})

export default router
