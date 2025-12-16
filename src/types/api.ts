export interface AnimeImage {
  image_url?: string | null;
  small_image_url?: string | null;
  large_image_url?: string | null;
  medium_image_url?: string | null;
  maximum_image_url?: string | null;
}

export interface AnimeImages {
  jpg: AnimeImage;
  webp: AnimeImage;
}

export interface AnimeTrailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images: {
    image_url: string | null;
    small_image_url: string | null;
    medium_image_url: string | null;
    large_image_url: string | null;
    maximum_image_url: string | null;
  };
}

export interface Title {
  type: string;
  title: string;
}

export interface AiredDateProp {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface AiredProp {
  from: AiredDateProp;
  to: AiredDateProp;
}

export interface Aired {
  from: string | null;
  to: string | null;
  prop: AiredProp;
  string: string;
}

export interface Broadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

export interface ProducerLicensorStudio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface GenreTheme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string | null;
  score: number | null;
  scored_by: number;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: Broadcast;
  producers: ProducerLicensorStudio[];
  licensors: ProducerLicensorStudio[];
  studios: ProducerLicensorStudio[];
  genres: GenreTheme[];
  explicit_genres: GenreTheme[];
  themes: GenreTheme[];
  demographics: GenreTheme[];
}

export type ApiAnimeList = Anime[]

export interface PaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface PaginationData {
  current_page: number;
  has_next_page: boolean;
  items: PaginationItems;
  last_visible_page: number;
}

export interface ApiData {
  data: ApiAnimeList;
  pagination: PaginationData;
}
