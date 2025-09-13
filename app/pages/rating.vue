<script setup lang="ts">
import Rating from '@/components/sections/Rating.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Рейтинг абитуриентов' }];
</script>

<template>
  <main>
    <SiteBreadcrumbs :items="breadcrumbs" />
    <div class="container mx-auto py-6">
      <Rating />
    </div>
  </main>
</template>

<style scoped>
.container { max-width: 1200px; }
</style>