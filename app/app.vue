<template>
  <SiteHeader />
  <NuxtLoadingIndicator color="#00ffdd" :height="3" />
  <NuxtLayout>
    <ErrorPage v-if="showCustomError" />
    <NuxtPage v-else />
  </NuxtLayout>
  <SiteFooter />
  <CustomLoader v-if="initialLoading" />
  <ApplyModal v-if="isModalOpen" @close="isModalOpen = false" />
</template>

<script setup lang="ts">
import { onErrorCaptured, onMounted, ref } from 'vue'
import CustomLoader from '~/components/CustomLoader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import ErrorPage from '~/error.vue'
import ApplyModal from '~/components/ui/ApplyModal.vue'

const showCustomError = ref(false)
const initialLoading = ref(true)
const isModalOpen = ref(false)

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

defineExpose({ isModalOpen })
</script>
