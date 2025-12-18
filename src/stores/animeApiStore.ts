import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import { CACHE_TIME, STORE_PERSIST_ANIME_FETCH_DATA } from '@/constants'
import type { ApiAnimeList, ApiData } from '@/types/api'
import type { OneAnime } from '@/types/anime'

export const useAnimeApiStore = defineStore(
  'apiAnimeData',
  () => {
    const homeData = shallowRef<ApiData | null>(null)
    const rawAnime = shallowRef<ApiAnimeList | null>(null)
    const lastFetch = ref<number>(0)
    const isLoading = ref<boolean>(false)
    const customError = ref<AxiosError | null>(null)

    const BASE_URL: string = 'https://api.jikan.moe/v4/'
    const BASE_ANIME_URL: string = 'https://api.jikan.moe/v4/anime/'

    async function fetchAnimeData(): Promise<ApiData | AxiosError> {
      const now: number = Date.now()
      const storageData = localStorage.getItem(STORE_PERSIST_ANIME_FETCH_DATA)

      if (storageData) {
        const parsedData = JSON.parse(storageData)
        const lastFetch = parsedData.lastFetch

        if (now - lastFetch < CACHE_TIME) {
          return (homeData.value = parsedData.homeData as ApiData)
        }
      }

      localStorage.removeItem(STORE_PERSIST_ANIME_FETCH_DATA)

      isLoading.value = true

      try {
        const response = await axios.get(`${BASE_URL}anime`)
        homeData.value = response.data
        lastFetch.value = now
        return homeData.value as unknown as ApiData
      } catch (error) {
        if (axios.isAxiosError(error)) {
          customError.value = error
          homeData.value = null
          return error as AxiosError
        } else {
          customError.value = new Error('Unknown Error') as AxiosError
          homeData.value = null
          return customError.value
        }
      } finally {
        isLoading.value = false
      }
    }

    const findAnime = (animeList: ApiAnimeList, animeId: OneAnime['id']): ApiAnimeList => {
      const apiAnime = animeList.filter((anime) => anime.mal_id === animeId)
      return apiAnime
    }

    async function fetchAnimeById(animeId: OneAnime['id']): Promise<ApiAnimeList | AxiosError> {
      const storageData = localStorage.getItem(STORE_PERSIST_ANIME_FETCH_DATA)

      if (storageData) {
        const parsedData = JSON.parse(storageData)
        rawAnime.value = findAnime(parsedData.homeData.data, animeId) as ApiAnimeList
        return rawAnime.value
      }

      isLoading.value = true

      try {
        const response = await axios.get(`${BASE_ANIME_URL}${animeId}`)
        rawAnime.value = [...response.data]
        return rawAnime.value as ApiAnimeList
      } catch (error) {
        if (axios.isAxiosError(error)) {
          customError.value = error
          rawAnime.value = null
          return error as AxiosError
        } else {
          customError.value = new Error('Unknown Error') as AxiosError
          rawAnime.value = null
          return customError.value
        }
      }finally{
        isLoading.value = false
      }
    }

    return {
      homeData,
      lastFetch,
      isLoading,
      customError,
      findAnime,
      fetchAnimeData,
      fetchAnimeById,
    }
  },
  {
    persist: {
      key: STORE_PERSIST_ANIME_FETCH_DATA,
      pick: ['homeData', 'lastFetch'],
    },
  },
)
