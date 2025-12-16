import { computed, shallowRef, ref, watch } from 'vue'
import type { OneAnime } from '@/types/anime'
import noImage from '@/assets/images/no-image.jpg'
import { IMAGE_TIMEOUT } from '@/constants'

export function useAnime(anime: OneAnime) {
  const animeRef = shallowRef(anime)
  const displayedImg = ref(noImage)

  const animeTitle = computed(() => {
    return animeRef.value['title_eng'] || animeRef.value['title_japan'] || 'Unknown'
  })

  const onImageError = (): string => {
    return (displayedImg.value = noImage)
  }

  const preloadImg = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = url

      img.onload = () => {
        resolve(true)
      }

      img.onerror = () => {
        resolve(false)
      }

      setTimeout(() => {
        resolve(false)
      }, IMAGE_TIMEOUT)
    })
  }

  watch(
    () => animeRef.value.poster?.webp.image_url,
    async (newUrl) => {
      if (!newUrl) {
        displayedImg.value = noImage
        return
      }

      displayedImg.value = noImage

      const isLoaded = await preloadImg(newUrl)

      if (isLoaded) {
        displayedImg.value = newUrl
      }
    },
    { immediate: true },
  )

  return {
    displayedImg,
    animeTitle,
    onImageError,
  }
}
