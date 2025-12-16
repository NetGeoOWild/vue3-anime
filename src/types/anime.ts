import type { ProducerLicensorStudio, AnimeImages, GenreTheme } from './api'

export interface OneAnime {
  id: number
  urlInfo?: string
  poster?: AnimeImages
  title_japan: string | null
  title_eng: string | null
  type: string
  episodes: number | null
  status?: string
  duration?: string
  rating: string | null
  score: number | null
  background: string | null
  year: number | null
  producers: ProducerLicensorStudio[]
  studios: ProducerLicensorStudio[]
  genres: GenreTheme[]
}

export type AnimeList = OneAnime[]
