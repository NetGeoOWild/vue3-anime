<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAnimeRouteStore } from '@/stores/animeRouteStore'
import { useAnimeApiStore } from '@/stores/animeApiStore';
import type { ApiAnimeList, ApiData } from '@/types/api';
import type { AnimeList } from '@/types/anime';
import BaseAnimeCard from '@/components/ui/BaseAnimeCard.vue';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import BaseAxiosError from '@/components/ui/BaseAxiosError.vue';

const animeRouteStore = useAnimeRouteStore();
const animeApiStore = useAnimeApiStore();

onMounted(async () => {
  await animeApiStore.fetchAnimeData()
  animeRouteStore.fillData(animeApiStore.homeData?.data as ApiAnimeList) as AnimeList
})

watch(animeApiStore.homeData as ApiData, (newVal) => {
  animeApiStore.homeData = newVal
})
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">

    <div class="flex justify-center flex-wrap"
      v-if="animeApiStore.homeData && !animeApiStore.customError && !animeApiStore.isLoading">
      <base-anime-card v-for="anime in animeRouteStore.data" :key="anime.id" :anime="anime">
      </base-anime-card>
    </div>

    <base-loader v-if="!animeApiStore.homeData && !animeApiStore.customError && animeApiStore.isLoading"></base-loader>

    <base-axios-error v-if="animeApiStore.customError" :error="animeApiStore.customError"
      @retry="animeApiStore.fetchAnimeData()"></base-axios-error>
  </main>
</template>
