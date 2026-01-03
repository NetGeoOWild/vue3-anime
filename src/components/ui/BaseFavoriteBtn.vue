<script setup lang="ts">
defineProps<{
  isInFavorites: boolean
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <div
    class="w-[30px] h-[30px] absolute top-1.5 right-1.5 z-99 cursor-pointer border border-solid border-green-500"
    :class="isInFavorites ? 'bg-green-500' : 'bg-gray-600/80'"
  >
    <button class="block w-full h-full" @click.prevent.stop="emits('click')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 hover:bg-green-500 hover:text-white transition-all duration-300 w-full h-full"
        :class="isInFavorites ? 'text-white' : 'text-green-500'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>
</template>
