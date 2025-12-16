<template>
  <footer class="footer">
    <div class="container">
      <div class="bg-gray-500 px-15 py-5 max-[1220px]:px-5 hover:bg-transparent transition-all duration-700">
        <div class="flex items-center align-middle">
          <router-link :to="{ name: 'home' }" class="block">
            <img class="block w-full max-w-[200px]" src="../assets/images/logo.png" alt="logo" />
          </router-link>
          <p class="text-white text-lg">
            "GOGA ANIME OT BOGA" - сайт онлайн anime в хорошем качестве бесплатно.
            <span class="block">P.S - Не благодари брат. (Ставь лайк, если тоже любишь Шрека) </span>
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>
