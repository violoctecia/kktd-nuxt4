<script lang="ts">
import { defineComponent } from 'vue'
import AdmissionPlan from '@/components/sections/AdmissionPlan.vue'
import DocumentSubmission from '@/components/sections/DocumentSubmission.vue'

export default defineComponent({
  components: {
    DocumentSubmission,
    AdmissionPlan
  }
})
</script>

<template>
  <div class="container mx-auto py-6">
    <DocumentSubmission />
    <AdmissionPlan />
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px
}
</style>
