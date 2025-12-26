<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMobileMenu } from '@/composables/useMobileMenu';
import { useAnimeApiStore } from '@/stores/animeApiStore';
import { usePaginationStore } from '@/stores/paginationStore';
import AppMobileMenu from './AppMobileMenu.vue';
const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

const route = useRoute()
const animeApiStore = useAnimeApiStore()
const paginationStore = usePaginationStore()
</script>

<template>
  <header>

    <div class="container">
      <div class="bg-white flex justify-around items-center align-middle max-[1220px]:justify-between px-5">
        <router-link :to="{ name: 'home', query: { ...route.query, page: paginationStore.currPage } }" class="block">
          <img class="block w-full max-w-[200px]" src="../assets/images/logo.png" alt="logo" />
        </router-link>

        <ul class="flex justify-around items-center align-middle flex-wrap gap-5 max-[1220px]:hidden">
          <li class="uppercase font-bold text-[16px] text-[#444]/60">
            <router-link :to="{ name: 'home', query: { ...route.query, page: paginationStore.currPage } }"
              class="hover:text-green-600 transition-all duration-300 block">
              Анимэ
            </router-link>
          </li>
          <li class="uppercase font-bold text-[16px] text-[#444]/60">
            <router-link :to="{ name: 'favorites' }" class="hover:text-green-600 transition-all duration-300 block">
              Избранное
            </router-link>
          </li>
        </ul>

        <div class="w-full max-w-[440px] relative max-[1220px]:hidden">
          <input v-model.trim="animeApiStore.searchInput"
            class="w-full border border-green-600 rounded-[5px] text-[16px] pl-2.5 pr-[45px] py-1 shadow-[inset_0_2px_3px_0_rgba(0,0,0,0.1)] focus:outline-none"
            type="text" placeholder="Введите название">
          <button
            class="w-10 h-10 flex justify-center align-middle items-center absolute right-0 -top-[3px] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
              stroke="currentColor" class="text-green-600 size-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        <div class="mobile hidden max-[1220px]:block" @click="toggleMobileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

      </div>
    </div>

  </header>

  <app-mobile-menu :is-mobile-menu-open="isMobileMenuOpen" @close-mobile="closeMobileMenu"></app-mobile-menu>
</template>
