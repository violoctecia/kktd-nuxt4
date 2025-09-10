<template>
    <div class="rounded-xl border-l-4 border-primary bg-white p-8 shadow-lg">
        <h2 class="faq-question text-primary-dark mb-4 text-lg font-semibold">{{ question }}</h2>
        <div class="faq-answer leading-relaxed text-gray-700">
            <p v-if="answerText">{{ answerText }}</p>
            <ul v-if="answerList" class="ml-6 mt-2 list-disc space-y-1">
                <li v-for="(li, liIndex) in answerList" :key="liIndex">{{ li }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface FAQProps {
    question: string;
    answerText?: string;
    answerList?: string[];
}

defineProps<FAQProps>();
</script>
