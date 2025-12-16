<script setup lang="ts">
import type { AxiosError } from 'axios';

defineProps<{
  error: AxiosError | string
}>()
</script>

<template>
  <div>
    <p>Ошибка: {{ error }}</p>
  </div>
</template>
