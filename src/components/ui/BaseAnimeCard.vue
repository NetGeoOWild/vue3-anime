<script setup lang="ts">
import { useAnimeRouteStore } from '@/stores/animeRouteStore';
import { useAnime } from '@/composables/useAnime';
import type { OneAnime } from '@/types/anime';
import BaseFavoriteBtn from './BaseFavoriteBtn.vue';

const animeRouteStore = useAnimeRouteStore();

const props = defineProps<{
  anime: OneAnime,
}>()

const animeTitle = useAnime(props.anime).animeTitle
</script>

<template>
  <div class="w-[20%] max-[950px]:w-[25%] max-[760px]:w-[33%] max-[591px]:w-[50%] mb-2.5 px-[5px]">
    <router-link :to="{ name: 'anime', params: { id: anime.id } }" class="block relative">
      <div class="max-h-[200px] overflow-hidden">
        <img v-if="anime.poster && anime.poster.webp.image_url" class="max-h-[200px] block w-full min-h-full" :src="anime.poster.webp.image_url" />
        <div v-else>Картинка - Заглушка</div>
      </div>
      <div class="text-white font-bold absolute left-0 right-0 bottom-0 py-1.5 text-center bg-gray-600/80">
        <div>
          {{ animeTitle }}
        </div>
      </div>
      <div
        class="absolute top-1.5 left-1.5 text-white bg-green-500 rounded-sm px-[3px]  py-[5px] text-[13px] font-semibold">
        {{ anime.year || 'XXXX' }}
      </div>

      <!--favorites-->
      <base-favorite-btn :is-in-favorites="animeRouteStore.isAnimeFavorite(anime.id)" @click="animeRouteStore.favoriteHandler(anime)"></base-favorite-btn>
      <!--favorites-->
    </router-link>
  </div>

</template>
