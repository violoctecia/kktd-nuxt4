<template>
  <SiteHeader />

  <NuxtLoadingIndicator color="#00ffdd" :height="3" />

  <NuxtLayout>
    <ErrorPage v-if="showCustomError" />
    <NuxtPage v-else />
  </NuxtLayout>

  <SiteFooter />

  <CustomLoader v-if="initialLoading" />
</template>

<script setup lang="ts">
import { onErrorCaptured, ref, onMounted } from 'vue'
import SiteFooter from '~/components/SiteFooter.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import ErrorPage from '~/error.vue'
import CustomLoader from '~/components/CustomLoader.vue'

const showCustomError = ref(false)
const initialLoading = ref(true)

onErrorCaptured((err) => {
  console.error('Captured error:', err)
  showCustomError.value = true
  return false
})

onMounted(() => {
  setTimeout(() => {
    initialLoading.value = false
  }, 1500)
})
</script>
