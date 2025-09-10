<template>
  <SiteHeader />
  <NuxtLayout>
    <ErrorPage v-if="showCustomError" />
    <NuxtPage v-else />
  </NuxtLayout>
  <SiteFooter />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import SiteFooter from '~/components/SiteFooter.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import ErrorPage from '~/error.vue'

const showCustomError = ref(false)

onErrorCaptured((err) => {
  console.error('Captured error:', err)
  showCustomError.value = true
  return false 
})
</script>
