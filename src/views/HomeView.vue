<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useAnimeRouteStore } from '@/stores/animeRouteStore'
import { useAnimeApiStore } from '@/stores/animeApiStore';
import BaseAnimeCard from '@/components/ui/BaseAnimeCard.vue';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import BaseAxiosError from '@/components/ui/BaseAxiosError.vue';

const animeRouteStore = useAnimeRouteStore();
const animeApiStore = useAnimeApiStore();

const apiData = computed(() => animeApiStore.homeData)

watch(apiData, (newVal) => {
  if (newVal?.data) {
    animeRouteStore.fillData(newVal.data)
  }
})

onMounted(() => {
  animeApiStore.fetchAnimeData()
})
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">

    <div class="flex flex-wrap" v-if="animeApiStore.homeData && !animeApiStore.customError && !animeApiStore.isLoading">
      <base-anime-card v-for="anime in animeRouteStore.data" :key="anime.id" :anime="anime">
      </base-anime-card>
    </div>

    <base-loader v-if="!animeApiStore.homeData && !animeApiStore.customError && animeApiStore.isLoading"></base-loader>

    <base-axios-error v-if="animeApiStore.customError" :error="animeApiStore.customError" @retry="animeApiStore.fetchAnimeData()"></base-axios-error>
  </main>
</template>
