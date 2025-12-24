<script setup lang="ts">
import { useAnimeRouteStore } from '@/stores/animeRouteStore';
import { useAnimeStore } from '@/stores/animeStore';
import type { OneAnime } from '@/types/anime';
import BaseFavoriteBtn from './BaseFavoriteBtn.vue';

const animeRouteStore = useAnimeRouteStore();
const animeStore = useAnimeStore()

defineProps<{
  anime: OneAnime,
}>()
</script>

<template>
  <router-link :to="{ name: 'anime', params: { id: anime.id } }"
    class="block relative min-h-[200px] w-[18%] max-[950px]:w-[20%] max-[760px]:w-[25%] max-[591px]:w-[33%] max-[471px]:w-full mb-2.5 mx-[5px]">
    <div class="max-h-[200px] overflow-hidden">
      <img class="block w-full min-h-full"
        v-lazy="{ src: anime.poster?.webp.image_url, loaded: anime.poster?.webp.image_url, loading: animeStore.imagePlaceholder, error: animeStore.imagePlaceholder }"
        alt="Poster" />
    </div>
    <div
      class="text-white font-bold absolute left-0 right-0 bottom-0 py-1.5 text-center bg-gray-600 overflow-hidden">
      <div>
        {{ anime['title_eng'] || (anime['title_japan'] as string) || 'Unknown' }}
      </div>
    </div>
    <div
      class="absolute top-1.5 left-1.5 text-white bg-green-500 rounded-sm px-[3px]  py-[5px] text-[13px] font-semibold">
      {{  anime.year || 'XXXX'}}
    </div>

    <!--favorites-->
    <base-favorite-btn :is-in-favorites="animeRouteStore.isAnimeFavorite(anime.id)"
      @click="animeRouteStore.favoriteHandler(anime)">
    </base-favorite-btn>
    <!--favorites-->
  </router-link>

</template>
