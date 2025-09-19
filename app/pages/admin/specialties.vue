<template>
	<section class="h-full">
		<div class="head">
			<h1>Управление специальностями</h1>
			<div class="head__tools">
				<button class="admin-btn" @click="showCreateModal">Добавить специальность</button>
				<button class="admin-btn" @click="refresh()">Перезагрузить список</button>
			</div>
		</div>
		<div class="content">
			<table class="table" v-if="data?.length && !pending">
				<thead>
					<tr>
						<th scope="col" v-for="key in Object.keys(data?.[0] || {})" :key="key">
							{{ dataKeyAliases[key as keyof Specialty] }}
						</th>
						<th scope="col">Управление</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td v-for="(i, idx) in item" :key="idx">{{ i }}</td>
						<td class="">
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
import type { Specialty } from '#shared/types';
import ModalUniversalCRUD from '~/components/admin/ModalUniversalCRUD.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import { useModalStore } from '~/store/modalsStore';

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

definePageMeta({
	layout: 'admin',
});

const { data, error, pending, refresh } = await useFetch<Specialty[]>(`${backendUrl}/specialties`, {
	server: false,
	lazy: true,
});

const dataKeyAliases: Record<keyof Specialty, string> = {
	id: 'id',
	code: 'Код специальности',
	name: 'Название специальности',
	qualification: 'Квалификация',
	durationMonths: 'Срок обучения (мес.)',
	base: 'База (класс)',
	form: 'Форма обучения',
};

const modal = useModalStore();

function showCreateModal() {
	const item: Specialty = {
		code: '',
		name: '',
		qualification: '',
		durationMonths: 4,
		base: 9,
		form: '',
	};

	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'create',
		endpoint: 'specialties',
		fieldAliases: dataKeyAliases,
		fieldConfig: {
			durationMonths: { type: 'number' },
			base: { type: 'number' },
			code: { type: 'text' },
			name: { type: 'text' },
			qualification: { type: 'text' },
			form: { type: 'text' },
		},
	});
}

function showEditModal(item: Specialty) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'update',
		endpoint: 'specialties',
		fieldAliases: dataKeyAliases,
		fieldConfig: {
			durationMonths: { type: 'number' },
			base: { type: 'number' },
			code: { type: 'text' },
			name: { type: 'text' },
			qualification: { type: 'text' },
			form: { type: 'text' },
		},
	});
}

function showDeleteModal(item: Specialty) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'delete',
		endpoint: 'specialties',
		fieldAliases: dataKeyAliases,
	});
}
</script>
