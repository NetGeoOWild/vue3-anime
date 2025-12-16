import { defineStore } from 'pinia'
import { ref, shallowRef, computed } from 'vue'
import type { Anime, ApiAnimeList } from '@/types/api'
import type { AnimeList, OneAnime } from '@/types/anime'
import { STORE_PERSIST_FAVORITES } from '@/constants'

export const useAnimeRouteStore = defineStore(
  'routeAnime',
  () => {
    const data = shallowRef<AnimeList | null>(null)

    const fillData = (apiAnimeList: ApiAnimeList): AnimeList | null => {
      if (!apiAnimeList) {
        return null
      }

      return (data.value = apiAnimeList.map((anime: Anime) => {
        return {
          id: anime.mal_id,
          urlInfo: anime.url,
          poster: anime.images,
          title_japan: anime.title_japanese,
          title_eng: anime.title_english,
          type: anime.type,
          episodes: anime.episodes,
          status: anime.status,
          duration: anime.duration,
          rating: anime.rating,
          score: anime.score,
          background: anime.background,
          year: anime.year,
          producers: anime.producers,
          studios: anime.studios,
          genres: anime.genres,
        }
      }))
    }

    const favorites = ref<AnimeList>([])

    const isAnimeFavorite = computed(() => {
      return (animeId: OneAnime['id']): boolean => {
        return favorites.value.find((anime) => anime.id === animeId) ? true : false
      }
    })

    const addToFavorites = (anime: OneAnime): void => {
      favorites.value.push(anime)
    }

    const removeFromFavorites = (animeId: OneAnime['id']): AnimeList => {
      return (favorites.value = favorites.value.filter((anime) => anime.id !== animeId))
    }

    const getData = (animeId: OneAnime['id']): OneAnime | undefined => {
      const anime = data.value?.find((anime) => anime.id === animeId)
      return anime
    }

    const favoriteHandler = (anime: OneAnime) => {
      if (isAnimeFavorite.value(anime.id)) {
        removeFromFavorites(anime.id)
      } else {
        addToFavorites(anime)
      }
    }

    return {
      favorites,
      data,
      fillData,
      getData,
      isAnimeFavorite,
      addToFavorites,
      removeFromFavorites,
      favoriteHandler,
    }
  },
  {
    persist: {
      key: STORE_PERSIST_FAVORITES,
      pick: ['favorites'],
    },
  },
)
