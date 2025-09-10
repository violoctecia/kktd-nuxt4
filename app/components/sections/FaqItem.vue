<template>
  <div class="bg-white rounded-xl p-8 shadow-lg border-l-4 border-primary">
    <h3 class="faq-question text-primary-dark text-lg font-semibold mb-4">{{ question }}</h3>
    <div class="faq-answer text-gray-700 leading-relaxed">
      <p v-if="answerText">{{ answerText }}</p>
      <ul v-if="answerList" class="ml-6 list-disc mt-2 space-y-1">
        <li v-for="(li, liIndex) in answerList" :key="liIndex">{{ li }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface FAQProps {
  question: string
  answerText?: string
  answerList?: string[]
}
const props = defineProps<FAQProps>()
</script>
