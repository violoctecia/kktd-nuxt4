<template>
	<section>
		<div class="head">
			<h1>Управление поступающими</h1>
			<div class="head__tools">
				<button class="admin-btn" @click="showCreateModal">Создать запись</button>
				<button class="admin-btn" @click="refresh()">Перезагрузить список</button>
			</div>
		</div>
		<div class="content">
			<table class="table" v-if="data?.length && !pending">
				<thead>
					<tr>
						<th scope="col" v-for="key in Object.keys(data?.[0] || {})" :key="key">
							{{ dataKeyAliases[key as keyof Abiturient] || key }}
						</th>
						<th scope="col">Управление</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td v-for="(value, key) in item" :key="String(key)">
							{{ booleanAliases[String(key)]?.[String(value)] ?? value ?? '-' }}
						</td>

						<td>
							<div class="item-tools !flex-nowrap">
								<button class="admin-btn" @click="showEditModal(item)">Редактировать</button>
								<button class="admin-btn red" @click="showDeleteModal(item)">Удалить</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<LoadingSpinner class="text-blue-500" v-if="pending" />
			<div v-if="error">
				<p>Произошла ошибка:</p>
				<pre>{{ error }}</pre>
			</div>
			<p v-else-if="!data?.length">Записей еще нет</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { Abiturient } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import ModalUniversalCRUD from '~/components/admin/ModalUniversalCRUD.vue';
import { useModalStore } from '~/store/modalsStore';

definePageMeta({
	layout: 'admin',
});

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const { data, error, pending, refresh } = await useFetch<Abiturient[]>(`${backendUrl}/abiturient`, {
	server: false,
	lazy: true,
});

const dataKeyAliases: Record<keyof Abiturient, string> = {
	id: 'id',
	full_name: 'ФИО',
	specialtyId: 'id специльности',
	score: 'Средний балл',
	isEnrolled: 'Зачислен',
};
const booleanAliases: Record<string, Record<string, string>> = {
	isEnrolled: { true: 'Да', false: 'Нет' },
};

const modal = useModalStore();

const fieldConfig = {
	full_name: { type: 'text' },
	specialtyId: { type: 'number' },
	score: { type: 'float' },
	isEnrolled: {
		type: 'checkbox',
		labels: { true: 'Зачислен', false: 'Не зачислен' },
	},
};

function showCreateModal() {
	const item: Abiturient = {
		full_name: '',
		specialtyId: 0,
		score: 0,
		isEnrolled: false,
	};

	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'create',
		endpoint: 'abiturient',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}

function showEditModal(item: Abiturient) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'update',
		endpoint: 'abiturient',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}

function showDeleteModal(item: Abiturient) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'delete',
		endpoint: 'abiturient',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}
</script>

<style scoped></style>
