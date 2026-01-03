<script setup lang="ts">
import { useformStore } from '@/stores/formStore'
import { useAnimeStore } from '@/stores/animeStore'
import { useAnimeApiStore } from '@/stores/animeApiStore'
import BaseLoader from './BaseLoader.vue'

const formStore = useformStore()
const animeStore = useAnimeStore()
const animeApiStore = useAnimeApiStore()
</script>

<template>
  <div
    class="w-full h-full bg-black/50 fixed left-0 top-0 z-9998"
    @click="formStore.isFormOpen = !formStore.isFormOpen"
    v-show="formStore.isFormOpen"
  ></div>

  <form
    v-show="formStore.isFormOpen"
    class="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full max-w-[640px] z-9999 bg-white rounded-sm p-5 max-[651px]:max-w-[440px] max-[481px]:max-w-[310px]"
  >
    <img
      class="max-[651px]:-top-40 block w-full max-w-[300px] absolute -left-[110px] -top-[140px] -z-1"
      :src="animeStore.imageDanceFirst"
      alt="dance_chan"
    />
    <img
      class="block w-full max-w-[180px] absolute -right-[60px] bottom-[100px] -z-1 max-[651px]:bottom-[190px] max-[651px]:-right-[100px] max-[381px]:hidden"
      :src="animeStore.imageDanceSecond"
      alt="dance_chan"
    />
    <img
      class="block w-full max-w-[180px] absolute -left-[60px] bottom-0 -z-1 max-[651px]:-left-[90px] max-[381px]:hidden"
      :src="animeStore.imageDanceThird"
      alt="dance_chan"
    />
    <button
      type="button"
      class="cursor-pointer absolute top-2.5 right-2.5"
      @click="formStore.isFormOpen = !formStore.isFormOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>

    <h2 class="text-center font-bold text-2xl mb-5">
      {{ formStore.isRegistration ? 'Регистрация' : 'Авторизация' }}
    </h2>

    <div class="w-full max-w-[400px] mx-auto relative">
      <label class="flex flex-col" v-if="formStore.isRegistration">
        <span :class="formStore.isValidUserName ? 'text-black' : 'text-red-700'" class="block"
          >Имя на сайте*</span
        >
        <input
          v-model.trim="formStore.formData.userName"
          :class="
            formStore.isValidUserName
              ? 'border border-green-700 focus:border-green-600'
              : 'border border-red-700 focus:border-red-600'
          "
          class="w-full rounded-[5px] text-[16px] pl-2.5 pr-[45px] py-1 shadow-[inset_0_2px_3px_0_rgba(0,0,0,0.1)] focus:outline-none mb-5"
          type="text"
          placeholder="Введите псевдоним"
        />
      </label>
      <label class="flex flex-col">
        <span :class="formStore.isValidEmail ? 'text-black' : 'text-red-700'" class="block"
          >E-mail*</span
        >
        <input
          v-model.trim="formStore.formData.email"
          :class="
            formStore.isValidEmail
              ? 'border border-green-700 focus:border-green-600'
              : 'border border-red-700 focus:border-red-600'
          "
          class="w-full border border-green-700 rounded-[5px] text-[16px] pl-2.5 pr-[45px] py-1 shadow-[inset_0_2px_3px_0_rgba(0,0,0,0.1)] focus:outline-none mb-5"
          type="text"
          placeholder="Введите E-mail"
          autocomplete="username"
        />
      </label>
      <label class="relative flex flex-col">
        <span :class="formStore.isValidPassword ? 'text-black' : 'text-red-700'" class="block"
          >Пароль*</span
        >
        <input
          v-model.trim="formStore.formData.password"
          :class="
            formStore.isValidPassword
              ? 'border border-green-700 focus:border-green-600'
              : 'border border-red-700 focus:border-red-600'
          "
          class="w-full border border-green-700 rounded-[5px] text-[16px] pl-2.5 pr-[45px] py-1 shadow-[inset_0_2px_3px_0_rgba(0,0,0,0.1)] focus:outline-none mb-5"
          :type="formStore.showPassword"
          placeholder="Введите Пароль"
          autocomplete="current-password"
        />
        <button
          @click="formStore.isshowPassword = !formStore.isshowPassword"
          :class="formStore.isFormValid ? 'text-green-700' : 'text-red-700'"
          class="absolute top-[26px] right-[15px] cursor-pointer w-[30px] h-[30px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="block w-full h-full size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </label>

      <button
        class="mx-auto w-full max-w-[400px] block bg-green-700 text-white uppercase text-center text-lg font-bold px-2 py-2 rounded-sm cursor-pointer hover:bg-green-600 transition-all duration-300 mb-5 disabled:cursor-not-allowed disabled:bg-gray-600/80"
        :disabled="formStore.isFormEmpty"
        @click="formStore.submitHandler(formStore.formData)"
      >
        {{ formStore.isRegistration ? 'Зарегистрироваться' : 'Войти' }}
      </button>

      <button
        type="button"
        @click="formStore.toggleMode"
        class="cursor-pointer block text-white uppercase max-w-[250px] mx-auto text-sm bg-cyan-700 hover:bg-cyan-600 px-2.5 py-1.5 rounded-sm transition-all duration-300"
      >
        {{ formStore.isRegistration ? 'У меня уже есть аккаунт' : 'Перейти к регистрации' }}
      </button>
    </div>
  </form>

  <base-loader v-if="animeApiStore.isLoading"></base-loader>
</template>
