import { computed, shallowRef } from 'vue'
import type { OneAnime } from '@/types/anime'

export function useAnime(anime: OneAnime) {
  const animeRef = shallowRef(anime)

  const animeTitle = computed(() => {
    return animeRef.value['title_eng'] || animeRef.value['title_japan'] || 'Unknown'
  })

  return {
    animeTitle
  }
}
