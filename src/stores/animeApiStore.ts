import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import { CACHE_TIME, STORE_PERSIST_ANIME_FETCH_DATA } from '@/constants'
import type { ApiData } from '@/types/api'

export const useAnimeApiStore = defineStore(
  'apiAnimeData',
  () => {
    const homeData = shallowRef<ApiData | null>(null)
    const lastFetch = ref<number>(0)
    const isLoading = ref<boolean>(false)
    const customError = ref<AxiosError | null>(null)

    const BASE_URL: string = 'https://api.jikan.moe/v4/'

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
        }else{
          customError.value = new Error('Unknown Error') as AxiosError
          homeData.value = null
          return customError.value
        }
      } finally {
        isLoading.value = false
      }
    }

    return {
      homeData,
      lastFetch,
      isLoading,
      customError,
      fetchAnimeData,
    }
  },
  {
    persist: {
      key: STORE_PERSIST_ANIME_FETCH_DATA,
      pick: ['homeData', 'lastFetch'],
    },
  },
)
