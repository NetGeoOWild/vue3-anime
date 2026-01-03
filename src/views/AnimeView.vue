<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAnimeApiStore } from '@/stores/animeApiStore';
import { useAnimeRouteStore } from '@/stores/animeRouteStore';
import { useAnimeStore } from '@/stores/animeStore';
import { useFirebaseUserStore } from '@/stores/firebaseUserStore';
import type { AnimeList, OneAnime } from '@/types/anime';
import type { ApiAnimeList } from '@/types/api';
import BaseFavoriteBtn from '@/components/ui/BaseFavoriteBtn.vue';
import BaseBtn from '@/components/ui/BaseBtn.vue';
import BaseAxiosError from '@/components/ui/BaseAxiosError.vue';
import BaseLoader from '@/components/ui/BaseLoader.vue';


const animeRouteStore = useAnimeRouteStore();
const animeApiStore = useAnimeApiStore()
const animeStore = useAnimeStore()
const firebaseUserStore = useFirebaseUserStore()
const route = useRoute();

const animeId = ref(Number(route.params.id))

onMounted(async () => {
  const data = await animeApiStore.fetchAnimeById(animeId.value as number)
  const animeList = animeRouteStore.fillData(data as ApiAnimeList) as AnimeList
  animeStore.anime = animeList[0] as OneAnime
})
</script>

<template>
  <main class="container bg-[#EDEDED] p-5">
    <div v-if="animeStore.anime">
      <!--button-->
      <base-btn @click="$router.back">Вернуться назад</base-btn>
      <!--button-->
      <div class="flex items-start max-[981px]:flex-wrap">
        <div
          class="min-h-[200px] w-full max-w-[200px] relative mr-[15px] max-[981px]:mx-auto max-[981px]:mb-[15px] max-[981px]:max-w-[300px]">
          <img class="block rounded-lg w-full max-h-[250px] max-[981px]:max-h-full"
            v-lazy="{ src: animeStore.animePoster, loaded: animeStore.animePoster, loading: animeStore.imagePlaceholder, error: animeStore.imagePlaceholder }"
            alt="Poster" />
          <span
            class="block absolute top-1.5 left-1.5 text-white bg-green-500 rounded-sm px-[3px]  py-[5px] text-[14px] font-semibold">
            {{ animeStore.animeYear }}
          </span>
          <div class="absolute bottom-0 left-0 right-0 bg-gray-600 min-h-10 rounded-b-lg rounded-bl-lg">
            <div class="w-full max-w-[70px] px-2.5 py-3 bg-white rounded-[50%] text-xl mx-auto font-bold
            absolute -top-[30px] left-[50%] -translate-x-[50%] border-4 border-green-700 text-center">
              {{ animeStore.animeScore }}
            </div>
          </div>
          <base-favorite-btn v-if="firebaseUserStore.user" :is-in-favorites="animeRouteStore.isAnimeFavorite(animeId)"
            @click="animeRouteStore.favoriteHandler(animeStore.anime)">
          </base-favorite-btn>
        </div>

        <div>
          <div class="max-w-[900px] mb-[15px]">
            <h3 class="block mb-[15px] font-bold text-2xl">{{ animeStore.animeTitle }}</h3>
            <ul>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Год выпуска:</span> {{ animeStore.animeYear
              }}
              </li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Жанр:</span> {{ animeStore.animeGenres }}
              </li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Категория:</span> {{ animeStore.animeType }}
              </li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Всего серий:</span> {{
                animeStore.animeEpisodes }}
              </li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Студия:</span> {{ animeStore.animeStudios }}
              </li>
              <li class="mb-2 text-xl"><span class="font-bold text-lg">Режиссёр:</span> {{
                animeStore.animeProducers }}
              </li>
            </ul>
            <p class="text-lg text-[#888] mb-5">
              <span class="text-lg font-bold text-[#444]">Описание:</span> {{ animeStore.animeDescription }}
            </p>
            <a v-if="animeStore.animeExtendedInfo" target="_blank" :href="animeStore.animeExtendedInfo"
              class="text-cyan-600 font-bold text-lg">Подробнее здесь</a>
          </div>
        </div>
      </div>
    </div>

    <base-loader v-if="animeApiStore.isLoading"></base-loader>

    <base-axios-error v-if="animeApiStore.customError" :error="animeApiStore.customError"
      @retry="animeApiStore.retryAnimeById(animeId)">
    </base-axios-error>
  </main>
</template>
