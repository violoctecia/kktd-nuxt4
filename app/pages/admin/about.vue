<template>
	<div>
		<h1>Управление разделом "О колледже"</h1>
		<div class="head-tools">
			<button class="admin-btn" @click="data?.[0] ? showEditModal(data[0]) : showCreateModal()">
				{{ data?.[0] ? 'Редактировать' : 'Создать' }}
			</button>
			<button class="admin-btn" @click="refresh()">Перезагрузить</button>
		</div>

		<h2>Текущий контент:</h2>
		<div class="flex w-full items-start justify-start">
			<div class="html-content w-full max-w-4xl rounded-lg bg-white p-4 shadow-md" v-if="data?.[0]" v-html="data[0].content"></div>
			<div class="w-full items-center justify-center" v-else>
				<LoadingSpinner class="text-blue-600" v-if="pending" />
				<p v-if="error">Произошла какая-то ошибка: {{ error }}</p>
				<p v-if="!data?.length && !pending">Контента еще нет</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { About } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import AboutCRUD from '~/components/admin/modals/AboutCRUD.vue';
import { useModalStore } from '~/store/modalsStore';

const config = useRuntimeConfig();
const { backendUrl } = config.public;

const modal = useModalStore();

function showCreateModal() {
	modal.openModal(AboutCRUD, { mode: 'create' });
}

function showEditModal(item: About) {
	modal.openModal(AboutCRUD, { item, mode: 'update' });
}

definePageMeta({
	layout: 'admin',
});

const { data, error, pending, refresh } = await useFetch<About[]>(`${backendUrl}/about`, {
	server: false,
	lazy: true,
});
</script>
