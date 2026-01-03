import { ref, computed } from 'vue'
import type { OneAnime } from '@/types/anime'
import imageDanceFirst from '@/assets/images/dance_1.gif'
import imageDanceSecond from '@/assets/images/dance_2.gif'
import imageDanceThird from '@/assets/images/dance_3.gif'
import imagePlaceholder from '@/assets/images/no-image.jpg'
import { defineStore } from 'pinia'

export const useAnimeStore = defineStore('animeStore', () => {
  const anime = ref<OneAnime | null>(null)

  const animeTitle = computed(() => {
    return anime.value?.['title_eng'] || (anime.value?.['title_japan'] as string) || 'Unknown'
  })

  const animePoster = computed(() => {
    return anime.value?.poster?.webp.image_url
  })

  const animeYear = computed(() => {
    return anime.value?.year || 'XXXX'
  })

  const animeScore = computed(() => {
    return anime.value?.score || 'X.XX'
  })

  const animeGenres = computed(() => {
    return anime.value?.genres.map((genre) => genre.name).join(' / ') || 'Unknown'
  })

  const animeType = computed(() => {
    return anime.value?.type || 'Unknown'
  })

  const animeEpisodes = computed(() => {
    return anime.value?.episodes || 'Unknown'
  })

  const animeStudios = computed(() => {
    return anime.value?.studios.map((studio) => studio.name).join(' / ') || 'Unknown'
  })

  const animeProducers = computed(() => {
    return anime.value?.producers.map((prod) => prod.name).join(' / ') || 'Unknown'
  })

  const animeDescription = computed(() => {
    return anime.value?.background || 'Unknown'
  })

  const animeExtendedInfo = computed(() => {
    return anime.value?.urlInfo as string
  })

  return {
    imageDanceThird,
    imageDanceFirst,
    imageDanceSecond,
    anime,
    imagePlaceholder,
    animePoster,
    animeTitle,
    animeYear,
    animeScore,
    animeGenres,
    animeType,
    animeEpisodes,
    animeStudios,
    animeProducers,
    animeDescription,
    animeExtendedInfo,
  }
})
