<script setup lang="ts">
import { useAnimeApiStore } from '@/stores/animeApiStore';

const animeApiStore = useAnimeApiStore()
</script>

<template>
  <button class="w-full max-w-[200px] block bg-green-700 text-white uppercase text-center text-lg
     font-bold px-2 py-2 rounded-sm cursor-pointer hover:bg-green-600 transition-all duration-300 mb-5
     max-[981px]:mx-auto max-[981px]:max-w-[300px] max-[981px]:mb-10 disabled:cursor-not-allowed disabled:bg-gray-600/80"
     :disabled="animeApiStore.isLoading"
     >
    <slot></slot>
  </button>
</template>
