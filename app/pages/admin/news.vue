<template>
	<div>
		<h1>Управление новостями</h1>
		<button class="admin-btn mb-8" @click="showCreateModal">Создать новость</button>
		<h2>Текущие новости:</h2>
		<div class="flex w-full items-start justify-start">
			<div v-if="newsData">
				<NewsList v-if="newsData" :items="newsData" tag="h2" />
			</div>
			<div class="w-full items-center justify-center" v-if="pending">
				<LoadingSpinner class="text-blue-600" />
			</div>
			<div class="w-full items-center justify-center" v-if="error">
				<p>Произошла какая-то ошибка: {{ error }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NewsItem } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import CreateNews from '~/components/admin/modals/CreateNews.vue';
import NewsList from '~/components/sections/NewsList.vue';
import { useModalStore } from '~/store/modalsStore';

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const modal = useModalStore();

function showCreateModal() {
	modal.openModal(CreateNews);
}

definePageMeta({
	layout: 'admin',
});

const {
	data: newsData,
	error,
	pending,
} = await useFetch<NewsItem[]>(`${backendUrl}/news`, {
	server: false,
	lazy: true,
});
</script>

<style scoped></style>
