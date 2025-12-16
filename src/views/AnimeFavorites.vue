<script setup lang="ts">
import BaseFilmCard from '@/components/ui/BaseAnimeCard.vue';
import { useAnimeRouteStore } from '@/stores/animeRouteStore';
const animeRouteStore = useAnimeRouteStore();
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">
    <div class="flex max-[981px]:flex-wrap" v-if="animeRouteStore.favorites.length !== 0">
      <base-film-card v-for="anime in animeRouteStore.favorites" :key="anime.id" :anime="anime">
      </base-film-card>
    </div>
    <div class="text-center" v-else>
      <p class="text-xl font-bold">Добавляй в избранное, чтобы не забыть :)</p>
    </div>
  </main>
</template>
