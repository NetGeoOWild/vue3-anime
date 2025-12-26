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

  const pageParamName = computed(() => {
    return animeApiStore.searchInput.length === 0 ? 'page' : 'search-page'
  })

  const currPage = computed(() => {
    return route.query[pageParamName.value] ? Number(route.query[pageParamName.value]) : 1
  })

  function paginationMounted() {
    onMounted(() => {
      console.log('usePagination mounted')
      const query = { ...route.query }

      if (pageParamName.value === 'page') {
        delete query['search-page']
        query.page = '1'
      } else if (pageParamName.value === 'search-page') {
        delete query['page']
        query['search-page'] = '1'
      } else {
        query.page = '1'
      }

      router.push({ query })
    })
  }

  watch(
    () => route.query[pageParamName.value],
    async (newPage, oldPage) => {
      if (!newPage) return
      if (newPage === oldPage) return

      console.log('Watch triggered:', newPage)

      if (newPage) {
        await fetchPage(Number(newPage))
        animeApiStore.loadMoreBtn = false
      }
    },
    { immediate: true, deep: true },
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
    const query = { ...route.query }

    if (pageParamName.value === 'page') {
      delete query['search-page']
      query.page = page.toString()
    } else {
      delete query['page']
      query['search-page'] = page.toString()
    }

    router.push({ query })
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

  const goHome = () => {
    animeApiStore.searchInput = ''
    router.replace({
      name: 'home',
      query: {
        page: 1,
      },
    })
  }

  return {
    pageParamName,
    currPage,
    lastPage,
    allPages,
    displayedPages,
    goToPage,
    nextPage,
    prevPage,
    loadMore,
    paginationMounted,
    goHome,
  }
})
