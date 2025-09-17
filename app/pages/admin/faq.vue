<template>
	<div>
		<h1>Управление разделом "Вопросы и ответы"</h1>
		<div class="head-tools">
			<button class="admin-btn" @click="showCreateModal">Добавить вопрос</button>
			<button class="admin-btn" @click="refresh()">Перезагрузить список</button>
		</div>
		<h2>Текущий контент:</h2>
		<div class="flex w-full items-start justify-start">
			<div class="flex w-full flex-col gap-6" v-if="data?.length">
				<div v-for="item in data" :key="item.id" class="flex w-full max-w-4xl flex-col rounded-lg bg-white p-4 shadow-md">
					<h2>{{ item.question }}</h2>
					<div class="html-content rounded-lg bg-gray-100 p-4" v-html="item.content"></div>
					<div class="list-item-tools">
						<span class="mb-2">ID: {{ item.id }}</span>
						<div class="flex items-center gap-2">
							<button class="admin-btn sm w-fit" @click="showEditModal(item)">Редактировать новость</button>
							<button class="admin-btn sm red w-fit" @click="showDeleteModal(item)">Удалить новость</button>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full items-center justify-center" v-else>
				<LoadingSpinner class="text-blue-600" v-if="pending" />
				<p v-if="error">Произошла какая-то ошибка: {{ error }}</p>
				<p v-if="!data?.length">Контента еще нет</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Faq } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

import QuestionCRUD from '~/components/admin/modals/QuestionCRUD.vue';
import { useModalStore } from '~/store/modalsStore';

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const modal = useModalStore();

function showCreateModal() {
	modal.openModal(QuestionCRUD, { mode: 'create' });
}

function showDeleteModal(item: Faq) {
	modal.openModal(QuestionCRUD, { item, mode: 'delete' });
}

function showEditModal(item: Faq) {
	modal.openModal(QuestionCRUD, { item, mode: 'update' });
}

definePageMeta({
	layout: 'admin',
});

const { data, error, pending, refresh } = await useFetch<Faq[]>(`${backendUrl}/faq`, {
	server: false,
	lazy: true,
});
</script>
