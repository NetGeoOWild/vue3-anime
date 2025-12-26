import { computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useAnimeApiStore } from '@/stores/animeApiStore'
import { useAnimeRouteStore } from '@/stores/animeRouteStore'
import type { ApiAnimeList, ApiData } from '@/types/api'
import type { AnimeList } from '@/types/anime'
import { useRoute, useRouter } from 'vue-router'

export const usePaginationStore = defineStore('paginationStore', () => {
  const animeApiStore = useAnimeApiStore()
  const animeRouteStore = useAnimeRouteStore()
  const route = useRoute()
  const router = useRouter()

  const currPage = computed(() => {
    return route.query.page ? Number(route.query.page) : 1
  })

  function paginationMounted() {
    onMounted(() => {
      console.log('usePagination mounted')
      if (!route.query.page) {
        router.push({
          query: { ...route.query, page: 1 },
        })
      }
    })
  }

  watch(
    () => route.query.page,
    async (newPage, oldPage) => {
      if (!newPage) return
      if (newPage === oldPage) return
      console.log('Watch triggered:', newPage)
      if (newPage) {
        await fetchPage(Number(newPage))
        animeApiStore.loadMoreBtn = false
      }
    },
    { immediate: true },
  )

  async function fetchPage(page: number): Promise<void> {
    const apiData = (await animeApiStore.fetchAnimeData(undefined, page)) as ApiData
    animeRouteStore.fillData(apiData.data as ApiAnimeList) as AnimeList
  }

  const lastPage = computed(() => animeApiStore.homeData?.pagination.last_visible_page ?? 1)

  const allPages = computed(() => Array.from({ length: lastPage.value }, (_, i) => i + 1))

  const displayedPages = computed(() => {
    const total = allPages.value.length
    const current = currPage.value

    if (total <= 3) return allPages.value
    if (current <= 2) return [1, 2, 3]
    if (current >= total - 1) return [total - 2, total - 1, total]

    return [current - 1, current, current + 1]
  })

  const goToPage = (page: number) => {
    if (page === currPage.value) return

    router.push({
      query: {
        ...route.query,
        page,
      },
    })
  }

  const nextPage = () => {
    if (currPage.value < lastPage.value) {
      goToPage(currPage.value + 1)
    }
  }

  const prevPage = () => {
    if (currPage.value > 1) {
      goToPage(currPage.value - 1)
    }
  }

  const loadMore = async () => {
    if (currPage.value < lastPage.value) {
      animeApiStore.loadMoreBtn = true
      goToPage(currPage.value + 1)
    }
  }

  return {
    currPage,
    lastPage,
    allPages,
    displayedPages,
    goToPage,
    nextPage,
    prevPage,
    loadMore,
    paginationMounted,
  }
})
