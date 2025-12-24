import { ref, watch, computed } from 'vue'
import { useAnimeApiStore } from '@/stores/animeApiStore'
import { BASE_URL } from '@/constants'
import type { ApiAnimeList } from '@/types/api'
import { useAnimeRouteStore } from '@/stores/animeRouteStore'
import type { AnimeList } from '@/types/anime'
import { useRouter } from 'vue-router'

export function usePagination() {
  const animeApiStore = useAnimeApiStore()
  const animeRouteStore = useAnimeRouteStore()
  const router = useRouter()

  const lastPage = computed(() => {
    return animeApiStore.homeData?.pagination.last_visible_page
  })

  const allPages = computed(() => {
    return Array.from({ length: lastPage.value as number }, (_, i) => i + 1)
  })

  const currPage = ref<number>(animeApiStore.homeData?.pagination.current_page as number)

  watch(
    () => animeApiStore.homeData,
    (newVal) => {
      if (newVal?.pagination) {
        currPage.value = newVal.pagination.current_page
        router.push({
          path: '/',
          query: { page: currPage.value },
        })
      }
    },
    { immediate: true },
  )

  const displayedPages = computed(() => {
    const total = allPages.value.length
    const current = currPage.value

    if (total <= 3) {
      // Если всего страниц 3 или меньше, показываем все
      return allPages.value
    }

    if (current === 1) {
      // Первая страница: 1, 2, 3
      return [1, 2, 3]
    } else if (current === 2) {
      // Вторая страница: 1, 2, 3
      return [1, 2, 3]
    } else if (current === total) {
      // Последняя страница: последние 3
      return [total - 2, total - 1, total]
    } else if (current === total - 1) {
      // Предпоследняя страница: последние 3
      return [total - 2, total - 1, total]
    } else {
      // В середине: страница-1, страница, страница+1
      return [current - 1, current, current + 1]
    }
  })

  async function getCurrentPage(page: number, loadMore: boolean = false): Promise<AnimeList> {
    await animeApiStore.fetchAnimeData(BASE_URL, page, true, loadMore)
    const animeList = animeRouteStore.fillData(
      animeApiStore.homeData?.data as ApiAnimeList,
    ) as AnimeList
    return animeList
  }

  const customPage = (page: number) => {
    currPage.value = page
    getCurrentPage(allPages.value[currPage.value - 1] as number)
  }

  const nextPage = () => {
    if (
      allPages.value[currPage.value] &&
      currPage.value !== allPages.value[allPages.value.length - 1]
    ) {
      currPage.value = currPage.value + 1
      getCurrentPage(allPages.value[currPage.value - 1] as number)
    }

    return
  }

  const prevPage = () => {
    if (allPages.value[currPage.value - 2] && currPage.value !== allPages.value[0]) {
      currPage.value = currPage.value - 1
      getCurrentPage(allPages.value[currPage.value - 1] as number)
    }

    return
  }

  const loadMore = async () => {
    if (
      allPages.value[currPage.value] &&
      currPage.value !== allPages.value[allPages.value.length - 1]
    ) {
      currPage.value = currPage.value + 1
      await getCurrentPage(allPages.value[currPage.value - 1] as number, true)
    }
  }

  return {
    lastPage,
    allPages,
    currPage,
    displayedPages,
    getCurrentPage,
    nextPage,
    prevPage,
    customPage,
    loadMore,
  }
}
