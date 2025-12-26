<script setup lang="ts">
import { useAnimeApiStore } from '@/stores/animeApiStore';
import { usePaginationStore } from '@/stores/paginationStore';
import BaseBtn from './BaseBtn.vue';

const paginationStore = usePaginationStore()
const animeApiStore = useAnimeApiStore()
</script>

<template>
  <ul class="pagination__list flex justify-center items-center mb-5 pt-5">
    <li class="w-[30px] h-[30px]">
      <button
      class="flex justify-center items-center w-[30px] h-[30px] cursor-pointer disabled:cursor-not-allowed"
      :disabled="animeApiStore.isLoading"
      @click="paginationStore.prevPage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
    </li>
    <li v-for="page in paginationStore.displayedPages" :key="page" class="w-[30px] h-[30px]">
      <button
        class="flex justify-center items-center w-[30px] h-[30px] cursor-pointer text-lg bg-gray-600/80 disabled:cursor-not-allowed"
        :class="paginationStore.currPage === page ? 'text-green-500' : 'text-white'"
        :disabled="animeApiStore.isLoading"
        @click="paginationStore.goToPage(page)"
        >
        {{ page }}
      </button>
    </li>
    <li class="w-[30px] h-[30px]">
      <button
      class="flex justify-center items-center w-[30px] h-[30px] cursor-pointer disabled:cursor-not-allowed"
      :disabled="animeApiStore.isLoading"
      @click="paginationStore.nextPage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </li>
  </ul>
  <base-btn
  class="mx-auto"
  @click="paginationStore.loadMore"
  >
    Загрузить еще
  </base-btn>
</template>

<style scoped>
.pagination__list>li:not(:last-child) {
  margin-right: 5px;
}
</style>
