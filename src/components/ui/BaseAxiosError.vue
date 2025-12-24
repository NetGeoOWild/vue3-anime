<script setup lang="ts">
import type { AxiosError } from 'axios';
import BaseBtn from './BaseBtn.vue';

defineProps<{
  error: AxiosError
}>()

defineEmits(['retry'])
</script>

<template>
  <div>
    <div class="flex justify-center items-center mb-5">
      <div class="error-icon">⚠️</div>
      <h3 class="text-4xl font-bold mx-2 uppercase">Произошла ошибка</h3>
      <div class="error-icon">⚠️</div>
    </div>


    <!-- Отображаем различные поля ошибки Axios -->
    <div class="text-center mb-5" v-if="error.response">
      <!-- Ошибка от сервера -->
      <p class="mb-5 uppercase"><strong class="text-4xl">Статус Ошибки:</strong> <span class="text-4xl font-bold">"{{ error.response.status }}"</span></p>
      <p class="mb-5 uppercase"><strong class="text-4xl">Сообщение:</strong> <span class="text-4xl font-bold">"{{ error.message || 'Неизвестная ошибка' }}"</span></p>
    </div>

    <!-- Кнопка повтора -->
    <base-btn
    class="mx-auto max-w-[300px]"
    @click="$emit('retry')">
    Попробовать еще раз
    </base-btn>
  </div>
</template>
