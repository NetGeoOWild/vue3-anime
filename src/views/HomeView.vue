<script setup lang="ts">
import { onMounted } from 'vue';
import { useAnimeRouteStore } from '@/stores/animeRouteStore'
import { useAnimeApiStore } from '@/stores/animeApiStore';
import type { ApiAnimeList } from '@/types/api';
import type { AnimeList } from '@/types/anime';
import BaseAnimeCard from '@/components/ui/BaseAnimeCard.vue';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import BaseAxiosError from '@/components/ui/BaseAxiosError.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import BaseBtn from '@/components/ui/BaseBtn.vue';

const animeRouteStore = useAnimeRouteStore();
const animeApiStore = useAnimeApiStore();

onMounted(async () => {
  await animeApiStore.fetchAnimeData()
  animeRouteStore.fillData(animeApiStore.homeData?.data as ApiAnimeList) as AnimeList
})
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">

    <div v-if="animeApiStore.homeData && animeApiStore.isValidApiResponse(animeApiStore.homeData)
      && !animeApiStore.customError">

      <div ref="animeCardContainer" class="flex justify-center flex-wrap">
        <base-anime-card v-for="anime in animeRouteStore.data" :key="anime.id" :anime="anime">
        </base-anime-card>
      </div>

      <base-pagination></base-pagination>
    </div>

    <base-loader v-if="animeApiStore.isLoading"></base-loader>

    <base-axios-error v-if="animeApiStore.customError" :error="animeApiStore.customError"
      @retry="animeApiStore.retryAnimeCards">
    </base-axios-error>
  </main>
</template>
