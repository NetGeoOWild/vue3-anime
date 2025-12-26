<script setup lang="ts">
import { useMobileMenu } from '@/composables/useMobileMenu';
import { useAnimeApiStore } from '@/stores/animeApiStore';
import { usePaginationStore } from '@/stores/paginationStore';

const { closeMobileMenu } = useMobileMenu();
const paginationStore = usePaginationStore()
const animeApiStore = useAnimeApiStore()

defineEmits(['close-mobile'])

defineProps({
  isMobileMenuOpen: {
    type: Boolean,
    required: true,
    default: false,
  }
})

function animeBtnHandler() {
  closeMobileMenu()
  paginationStore.goHome()
}
</script>

<template>
  <div class="w-full h-full bg-black/50 fixed left-0 top-0 z-9998" :class="isMobileMenuOpen ? 'block' : 'hidden'"
    @click="$emit('close-mobile')"></div>

  <div class="w-full max-w-[280px] bg-white p-2.5 fixed top-0 z-9999 transition-all duration-300
       after:block after:bg-green-600 after:h-1 after:w-full after:absolute after:bottom-0 after:left-0"
    :class="isMobileMenuOpen ? 'left-0' : '-left-280'">
    <div class="w-full relative mb-2.5">
      <input
        v-model.trim="animeApiStore.searchInput"
        @keyup.enter="paginationStore.goToPage(paginationStore.currPage)"
        class="w-full border border-green-600 rounded-[5px] text-[16px] pl-2.5 pr-[45px] py-1 shadow-[inset_0_2px_3px_0_rgba(0,0,0,0.1)] focus:outline-none"
        type="text" placeholder="Введите название">
      <button
        @click="paginationStore.goToPage(paginationStore.currPage)"
        class="w-10 h-10 flex justify-center align-middle items-center absolute right-0 -top-[3px] cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
          class="text-green-600 size-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </div>

    <ul>
      <li class="mb-2.5">
        <button class="block uppercase font-bold text-[16px] text-[#444]/60 " @click="animeBtnHandler">Анимэ</button>
      </li>
      <li class="mb-2.5">
        <router-link :to="{ name: 'favorites' }" class="block uppercase font-bold text-[16px] text-[#444]/60"
          @click="closeMobileMenu">Избранное</router-link>
      </li>
    </ul>

  </div>

  <button class="block w-10 h-10 bg-red-500 cursor-pointer fixed z-9999 left-[280px] transition-all duration-300"
    :class="isMobileMenuOpen ? 'top-0' : '-top-40'" @click="$emit('close-mobile')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor"
      class="size-6 text-white mx-auto">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>

</template>
