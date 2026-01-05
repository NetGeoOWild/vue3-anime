<script setup lang="ts">
import { useMobileMenu } from '@/composables/useMobileMenu'
import { useAnimeApiStore } from '@/stores/animeApiStore'
import { usePaginationStore } from '@/stores/paginationStore'
import { useFirebaseUserStore } from '@/stores/firebaseUserStore'
import { useformStore } from '@/stores/formStore'
const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
import AppMobileMenu from './AppMobileMenu.vue'
import BaseForm from '@/components/ui/BaseForm.vue'
import BaseUserInterface from '@/components/ui/BaseUserInterface.vue'

const animeApiStore = useAnimeApiStore()
const paginationStore = usePaginationStore()
const formStore = useformStore()
const firebaseUserStore = useFirebaseUserStore()

function enterLogout() {
  if (firebaseUserStore.user !== null) {
    firebaseUserStore.logout()
  } else {
    formStore.isFormOpen = !formStore.isFormOpen
  }
}
</script>

<template>
  <header class="sticky top-0 z-999">
    <div class="container">
      <div
        class="bg-white flex justify-around items-center align-middle max-[1220px]:justify-between px-5"
      >
        <button class="block cursor-pointer" @click="paginationStore.goHome">
          <img class="block w-full max-w-[200px] max-[951px]:max-w-[150px] max-[591px]:max-w-[100px]" src="../assets/images/logo.png" alt="logo" />
        </button>

        <ul
          class="flex justify-around items-center align-middle flex-wrap gap-5 max-[1220px]:hidden"
        >
          <li>
            <button
              class="hover:text-green-600 transition-all duration-300 block uppercase font-bold text-[16px] text-[#444]/60 cursor-pointer"
              @click="paginationStore.goHome"
            >
              Анимэ
            </button>
          </li>
          <li>
            <button
              class="hover:text-green-600 transition-all duration-300 block uppercase font-bold text-[16px] text-[#444]/60 cursor-pointer"
              @click="enterLogout"
            >
              {{ firebaseUserStore.user ? 'Выйти' : 'Войти' }}
            </button>
          </li>
        </ul>

        <div class="w-full max-w-[440px] relative max-[1220px]:hidden">
          <input
            v-model.trim="animeApiStore.searchInput"
            @keyup.enter="paginationStore.goToPage(paginationStore.currPage)"
            class="w-full border border-green-600 rounded-[5px] text-[16px] pl-2.5 pr-[45px] py-1 shadow-[inset_0_2px_3px_0_rgba(0,0,0,0.1)] focus:outline-none"
            type="text"
            placeholder="Введите название"
          />
          <button
            @click="paginationStore.goToPage(paginationStore.currPage)"
            class="w-10 h-10 flex justify-center align-middle items-center absolute right-0 -top-[3px] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="text-green-600 size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        <div class="flex justify-center items-center align-middle">
          <div class="mobile hidden max-[1220px]:block" @click="toggleMobileMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>

          <base-user-interface class="max-[1220px]:hidden ml-10">
            {{
              (firebaseUserStore.user?.userName.length as number) > 15
                ? firebaseUserStore.user?.userName.slice(0, 13) + '...'
                : firebaseUserStore.user?.userName
            }}
          </base-user-interface>
        </div>
      </div>
    </div>
  </header>

  <app-mobile-menu
    :is-mobile-menu-open="isMobileMenuOpen"
    @close-mobile="closeMobileMenu"
  ></app-mobile-menu>
  <base-form></base-form>
</template>
