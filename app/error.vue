<script setup lang="ts">
import errorSvg from '~/assets/svg/original/404.svg'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-[#0E0E10] px-4">
    <img
      :src="errorSvg"
      alt="404 error"
      class="max-w-full w-[500px] h-auto mb-8"
    />
    <NuxtLink
      to="/"
      class="rounded-2xl bg-primary px-6 py-3 text-white text-lg font-medium shadow-lg hover:bg-primaryDark transition"
    >
      На главную
    </NuxtLink>
  </div>
</template>
