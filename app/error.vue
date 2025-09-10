<script setup lang="ts">
import errorSvg from '~/assets/svg/original/404.svg';
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center bg-[#0E0E10] px-4">
        <img :src="errorSvg" alt="404 error" class="mb-8 h-auto w-[500px] max-w-full" />
        <NuxtLink to="/" class="rounded-2xl bg-primary px-6 py-3 text-lg font-medium text-white shadow-lg transition hover:bg-primaryDark">
            На главную
        </NuxtLink>
    </div>
</template>
