<script setup lang="ts">
import type { AxiosError } from 'axios';

defineProps<{
  error: AxiosError;
}>()

defineEmits(['retry'])
</script>

<template>
  <div>
    <div class="flex justify-center items-center mb-5">
      <div class="error-icon">⚠️</div>
      <h3 class="text-2xl font-bold mx-2">Произошла ошибка</h3>
      <div class="error-icon">⚠️</div>
    </div>


    <!-- Отображаем различные поля ошибки Axios -->
    <div class="text-center mb-5" v-if="error.response">
      <!-- Ошибка от сервера -->
      <p class="text-xl"><strong>Статус:</strong> {{ error.response.status }}</p>
      <p class="text-xl"><strong>Сообщение:</strong> {{ error.response.data || 'Ошибка сервера' }}</p>
    </div>

    <div v-else class="text-center mb-5">
      <!-- Другие ошибки -->
      <p class="text-xl"><strong>Ошибка:</strong> {{ error.message }}</p>
    </div>

    <!-- Кнопка повтора -->
    <button class="block m-auto bg-green-700 text-white uppercase text-lg
     font-bold px-2 py-2 rounded-sm cursor-pointer hover:bg-green-600 transition-all duration-300 mb-5"
      @click="$emit('retry')">Повторить
    </button>

    <router-link :to="{ name: 'home' }" class="block m-auto bg-green-700 text-white uppercase text-lg
     font-bold px-2 py-2 rounded-sm cursor-pointer hover:bg-green-600 transition-all duration-300 mb-5">
     Вернуться на главную
    </router-link>
  </div>
</template>
