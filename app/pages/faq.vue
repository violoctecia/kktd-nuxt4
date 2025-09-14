<script setup lang="ts">
import ContactInfo from '@/components/sections/ContactInfo.vue';
import FaqItem from '@/components/sections/FaqItem.vue';
import SiteBreadcrumbs from '~/components/SiteBreadcrumbs.vue';

interface Faq {
	question: string;
	answerText?: string;
	answerList?: string[];
}

const breadcrumbs = [
	{ label: 'Главная', href: '/' },
	{ label: 'FAQ', href: '/faq' },
];

const { data: faqItems, error } = useFetch<Faq[]>('/api/faq');
</script>

<template>
	<div class="container mx-auto px-4 py-12">
		<SiteBreadcrumbs :items="breadcrumbs" />

		<h1 class="mb-8 text-3xl font-bold">Часто задаваемые вопросы</h1>

		<div class="flex flex-col gap-6">
			<FaqItem
				v-for="(item, index) in faqItems"
				:key="index"
				:question="item.question"
				:answer-text="item.answerText"
				:answer-list="item.answerList"
			/>
		</div>

		<ContactInfo class="mt-12" />

		<div v-if="error" class="mt-6 text-red-500">Ошибка загрузки FAQ: {{ error.message }}</div>
	</div>
</template>
