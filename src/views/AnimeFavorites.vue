<script setup lang="ts">
import { useAnimeRouteStore } from '@/stores/animeRouteStore'
import BaseFilmCard from '@/components/ui/BaseAnimeCard.vue'
import BaseBtn from '@/components/ui/BaseBtn.vue'

const animeRouteStore = useAnimeRouteStore()
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">
    <div v-if="animeRouteStore.favorites.length !== 0">
      <base-btn @click="$router.back">Вернуться назад</base-btn>

      <div class="flex max-[981px]:flex-wrap">
        <base-film-card v-for="anime in animeRouteStore.favorites" :key="anime.id" :anime="anime">
        </base-film-card>
      </div>
    </div>

    <div class="text-center" v-else>
      <base-btn class="mx-auto" @click="$router.back">Вернуться назад</base-btn>
      <p class="text-xl font-bold">Добавляй в избранное, чтобы не забыть :)</p>
    </div>
  </main>
</template>
