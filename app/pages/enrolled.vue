<script setup lang="ts">
import Enrolled from '@/components/sections/Enrolled.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

const breadcrumbs = [{ label: 'Главная', href: '/' }, { label: 'Зачисленные студенты' }];
</script>

<template>
  <main>
    <SiteBreadcrumbs :items="breadcrumbs" />
    <div class="container mx-auto py-6">
      <Enrolled />
    </div>
  </main>
</template>

<style scoped>
.container { max-width: 1000px; }
</style>