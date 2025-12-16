<script setup lang="ts">
import AppFooter from './layouts/AppFooter.vue';
import AppHeader from './layouts/AppHeader.vue';
</script>

<template>
  <div class="min-w-[320px] pt-[250px] max-[470px]:pt-0 max-[470px]:overflow-hidden">
    <div class="w-full max-w-[1100px] mx-auto my-0 max-[1220px]:max-w-[1000px] max-[951px]:max-w-3xl
    max-[761px]:max-w-[640px] max-[591px]:max-w-[480px]">
      <app-header></app-header>
      <router-view></router-view>
      <app-footer></app-footer>
    </div>
  </div>

</template>
