import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import { CACHE_TIME, STORE_PERSIST_ANIME_FETCH_DATA, BASE_URL } from '@/constants'
import type { ApiAnimeList, ApiData } from '@/types/api'
import type { AnimeList, OneAnime } from '@/types/anime'
import { useAnimeRouteStore } from './animeRouteStore'
import { useAnimeStore } from './animeStore'
import { useRoute } from 'vue-router'

export const useAnimeApiStore = defineStore(
  'apiAnimeData',
  () => {
    const firstPage = shallowRef<ApiData | null>(null)
    const homeData = ref<ApiData | null>(null)
    const rawAnime = ref<ApiAnimeList | null>(null)
    const lastFetch = ref<number>(0)
    const isLoading = ref<boolean>(false)
    const customError = ref<AxiosError | null>(null)

    const animeRouteStore = useAnimeRouteStore()
    const animeStore = useAnimeStore()
    const route = useRoute()

    async function fetchAnimeData(
      url: string = BASE_URL,
      page: number = 1,
      force: boolean = false,
      loadMore: boolean = false,
    ): Promise<ApiData | AxiosError> {
      const now: number = Date.now()
      const storageData = localStorage.getItem(STORE_PERSIST_ANIME_FETCH_DATA)

      if (storageData && !force && !loadMore) {
        const parsedData = JSON.parse(storageData)

        if (isValidApiResponse(parsedData.firstPage)) {
          const lastFetch = parsedData.lastFetch

          if (now - lastFetch < CACHE_TIME) {
            homeData.value = parsedData.firstPage as ApiData
            return homeData.value
          }
        }
      }

      localStorage.removeItem(STORE_PERSIST_ANIME_FETCH_DATA)

      isLoading.value = true

      try {
        const response = await axios.get(`${url}?page=${page}`)

        if (loadMore) {
          const oldVal = homeData.value as ApiData
          homeData.value = response.data

          if (homeData.value) {
            homeData.value.data = [...oldVal?.data, ...homeData.value.data]
          }

          return homeData.value as ApiData
        }

        homeData.value = response.data
        lastFetch.value = now

        if (homeData.value?.pagination.current_page === 1) {
          firstPage.value = homeData.value
        }

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

    async function fetchAnimeById(
      animeId: OneAnime['id'],
      force: boolean = false,
    ): Promise<ApiAnimeList | AxiosError> {
      const storageData = localStorage.getItem(STORE_PERSIST_ANIME_FETCH_DATA)

      if (storageData && !force) {
        const parsedData = JSON.parse(storageData)

        if (isValidApiResponse(parsedData.homeData)) {
          rawAnime.value = findAnime(parsedData.homeData.data, animeId) as ApiAnimeList
          return rawAnime.value
        }
      }

      isLoading.value = true

      try {
        const response = await axios.get(`${BASE_URL}/${animeId}`)
        rawAnime.value = [await response.data.data]
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
      } finally {
        isLoading.value = false
      }
    }

    function isValidApiResponse(apiObject: ApiData): boolean {
      if (!apiObject || typeof apiObject !== 'object') {
        return false
      }

      if (!apiObject.hasOwnProperty('data') || !apiObject.hasOwnProperty('pagination')) {
        return false
      }

      if (!Array.isArray(apiObject.data) || apiObject.data.length === 0) {
        return false
      }

      if (!apiObject.pagination || typeof apiObject.pagination !== 'object') {
        return false
      }

      return true
    }

    async function retryAnimeCards(): Promise<void> {
      const currentPage = Number(route.query['page'])
      const homeData = await fetchAnimeData(undefined, currentPage, true) as ApiData
      animeRouteStore.fillData(homeData.data as ApiAnimeList)
    }

    async function retryAnimeById(apiAnimeId: OneAnime['id']): Promise<void> {
      const apiAnimeList = await fetchAnimeById(apiAnimeId, true)
      const animeList = animeRouteStore.fillData(apiAnimeList as ApiAnimeList) as AnimeList
      animeStore.anime = animeList[0] as OneAnime
    }

    return {
      rawAnime,
      firstPage,
      homeData,
      lastFetch,
      isLoading,
      customError,
      findAnime,
      fetchAnimeData,
      fetchAnimeById,
      isValidApiResponse,
      retryAnimeById,
      retryAnimeCards,
    }
  },
  {
    persist: {
      key: STORE_PERSIST_ANIME_FETCH_DATA,
      pick: ['homeData', 'firstPage', 'lastFetch'],
    },
  },
)
