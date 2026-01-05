<script setup lang="ts">
import { usePaginationStore } from '@/stores/paginationStore'
const paginationStore = usePaginationStore()
</script>

<template>
  <footer class="footer mb-[250px] max-[470px]:mb-0">
    <div class="container">
      <div
        class="bg-gray-500 px-15 py-5 max-[1220px]:px-5 hover:bg-transparent transition-all duration-700"
      >
        <div class="flex items-center align-middle max-[768px]:flex-col-reverse">
          <button @click="paginationStore.goHome" class="block cursor-pointer">
            <img class="block w-full max-w-[200px] max-[951px]:max-w-[150px] max-[591px]:max-w-[100px]" src="../assets/images/logo.png" alt="logo" />
          </button>
          <p class="text-white text-lg max-[768px]:text-center">
            "GOGA ANIME OT BOGA" - сайт онлайн anime в хорошем качестве бесплатно.
            <span class="block"
              >P.S - Не благодари брат. (Ставь лайк, если тоже любишь Шрека)
            </span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
