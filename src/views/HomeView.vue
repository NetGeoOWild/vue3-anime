<script setup lang="ts">
import { useAnimeRouteStore } from '@/stores/animeRouteStore'
import { useAnimeApiStore } from '@/stores/animeApiStore'
import { usePaginationStore } from '@/stores/paginationStore'
import BaseAnimeCard from '@/components/ui/BaseAnimeCard.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseAxiosError from '@/components/ui/BaseAxiosError.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import BaseEmptyData from '@/components/ui/BaseEmptyData.vue'

const animeRouteStore = useAnimeRouteStore()
const animeApiStore = useAnimeApiStore()
const paginationStore = usePaginationStore()
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">
    <div
      v-if="
        animeApiStore.homeData &&
        animeApiStore.isValidApiResponse(animeApiStore.homeData) &&
        !animeApiStore.customError
      "
    >
      <div ref="animeCardContainer" class="flex justify-center flex-wrap">
        <base-anime-card v-for="anime in animeRouteStore.data" :key="anime.id" :anime="anime">
        </base-anime-card>
      </div>

      <base-pagination></base-pagination>
    </div>

    <base-loader v-if="animeApiStore.isLoading"></base-loader>

    <base-empty-data
      v-if="!animeApiStore.homeData || !animeApiStore.isValidApiResponse(animeApiStore.homeData)"
    ></base-empty-data>

    <base-axios-error
      v-if="animeApiStore.customError"
      :error="animeApiStore.customError"
      @retry="animeApiStore.retryAnimeCards(paginationStore.currPage)"
    >
    </base-axios-error>
  </main>
</template>
