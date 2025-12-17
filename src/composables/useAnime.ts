import { computed, shallowRef } from 'vue'
import type { OneAnime } from '@/types/anime'
import imagePlaceholder from '@/assets/images/no-image.jpg'

export function useAnime(anime: OneAnime) {
  const animeRef = shallowRef(anime)

  const animeTitle = computed(() => {
    return animeRef.value['title_eng'] || animeRef.value['title_japan'] || 'Unknown'
  })

  return {
    animeTitle,
    imagePlaceholder,
  }
}
