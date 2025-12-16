<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAnimeRouteStore } from '@/stores/animeRouteStore';
import { useAnime } from '@/composables/useAnime';
import type { OneAnime } from '@/types/anime';
import BaseFavoriteBtn from '@/components/ui/BaseFavoriteBtn.vue';

const animeRouteStore = useAnimeRouteStore();
const route = useRoute();

const animeId = Number(route.params.id) as unknown as OneAnime['id']
const anime = animeRouteStore.getData(animeId) as unknown as OneAnime

const animeUse = useAnime(anime)
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">
    <div v-if="anime">
      <div class="flex items-start max-[981px]:flex-wrap">
        <div class="w-full max-w-[200px] relative mr-[15px] max-[981px]:mx-auto max-[981px]:mb-[15px]">
          <img class="block rounded-lg" :src="animePoster" alt="poster" />
          <span
            class="block absolute top-1.5 left-1.5 text-white bg-green-500 rounded-sm px-[3px]  py-[5px] text-[14px] font-semibold">
            {{ anime.year || 'XXXX' }}
          </span>
          <div class="absolute bottom-0 left-0 right-0 bg-gray-600/80 min-h-10 rounded-b-lg rounded-bl-lg">
            <div class="w-full max-w-[70px] px-2.5 py-3 bg-white rounded-[50%] text-2xl mx-auto font-bold
            absolute -top-[30px] left-[50%] -translate-x-[50%] border-4 border-green-700 text-center">
              {{ anime.score }}
            </div>
          </div>
          <base-favorite-btn :is-in-favorites="animeRouteStore.isAnimeFavorite(animeId)" @click="animeRouteStore.favoriteHandler(anime)"></base-favorite-btn>
        </div>

        <div>
          <div class="max-w-[900px] mb-[15px]">
            <h3 class="block mb-[15px] font-bold text-2xl">{{ animeUse.animeTitle }}</h3>
            <ul>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Год выпуска:</span> {{ anime.year || 'XXXX'}}</li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Жанр:</span> {{ anime.genres.map((genre) => genre.name).join(' / ') }}</li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Категория:</span> {{ anime.type }}</li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Всего серий:</span> {{ anime.episodes }}</li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Студия:</span> {{ anime.studios.map((studio) => studio.name).join(' / ') }}</li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Режиссёр:</span> {{ anime.producers.map((producer) => producer.name).join(' / ') }} </li>
            </ul>
            <p class="text-lg text-[#888] mb-5">
              <span class="text-lg font-bold text-[#444]">Описание:</span> {{ anime.background || 'Unknown'}}
            </p>
            <a target="_blank" :href="anime.urlInfo" class="text-cyan-600 font-bold text-lg">Подробнее здесь</a>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>
      <p class="text-xl font-bold">Ничего не найдено :(</p>
    </div>
  </main>
</template>
