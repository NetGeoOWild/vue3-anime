<script setup lang="ts">
import { useFirebaseUserStore } from '@/stores/firebaseUserStore'
import imageAva from '@/assets/images/ava.gif'

const firebaseUserStore = useFirebaseUserStore()
</script>

<template>
  <div v-if="firebaseUserStore.user">
    <div class="flex flex-col justify-center items-center align-middle max-[1220px]:items-start">
      <img class="block max-w-20 mb-[5px]" :src="imageAva" alt="avatarka" />
      <span class="block font-bold uppercase mb-[5px]">
        <slot></slot>
      </span>
      <router-link
        :to="{ name: 'favorites' }"
        class="hover:text-green-600 transition-all duration-300 block uppercase font-bold text-[16px] text-[#444]/60 mb-[5px]"
      >
        Избранное
      </router-link>
    </div>
  </div>
</template>
